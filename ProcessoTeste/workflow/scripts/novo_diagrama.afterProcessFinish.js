function afterProcessFinish(processId){
	log.info("ID do processo: "+processId);
	
	var nomeProcesso = retornarNomeProcesso(processId);
	var objeto = retornarInfoGeracao(nomeProcesso);

	if(objeto){
		var documentId = anexarDocumento(objeto, processId);
		log.info("ID do documneto: "+documentId);
		log.info("Receber e-mail: "+objeto.receberEmail)
		if(documentId && objeto.receberEmail == "Sim"){
			enviaEmail(documentId, processId, objeto);
		}
	}else{
		throw ("Não foi possível gerar o PDF desta solicitação. Por favor, preencha o formulário de pré-cadastro localizado no GED.");
	}
}

function anexarDocumento(objeto, processId){
	var documentId;
	var pastaDestino = objeto.pasta;
	var usuarioAdmin = objeto.usuario;
	var senha = objeto.senha;
	try{		
		var file = gerarPDF(objeto, processId);

		var serviceManager = ServiceManager.getService("ECMDocument");
		var serviceHelper = serviceManager.getBean();
		var serviceBuilder = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService");
		var documentService = serviceBuilder.getDocumentServicePort();
		var factory = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ObjectFactory");

		var arrayBytes = JSON.parse(file).buf;

		var anexo = criarAnexo(factory, arrayBytes);

		var listaAnexo = factory.createAttachmentArray();
		listaAnexo.getItem().add(anexo);

		var result = documentService.createSimpleDocument(usuarioAdmin, senha, getValue("WKCompany"), pastaDestino,getValue("WKUser") ,"Relatório", listaAnexo);
		documentId = result.getItem().get(0).getDocumentId();

		log.info("Executou o serviço: "+result.getItem().get(0).getWebServiceMessage());

		hAPI.attachDocument(documentId);



	} catch(err) {
		log.info("ocorreu um erro ao executar o serviço: "+err);
	}

	return documentId;
}

function enviaEmail(documentId,processId,objeto){

	var url = fluigAPI.getDocumentService().getDownloadURL(documentId);

	//Monta mapaPaiFilho com parâmetros do template
	var parametros = new java.util.HashMap();
	parametros.put("SERVER_URL",objeto.servidor);
	parametros.put("TENANT_ID", getValue("WKCompany"));
	parametros.put("RECEIVER", obterNomeDestinatario(objeto.destinatario));
	parametros.put("processo", processId);
	parametros.put("link_download", url);

	//Este parâmetro é obrigatório e representa o assunto do e-mail
	parametros.put("subject", "Retorno do processo");

	//Monta lista de destinatários
	var destinatarios = new java.util.ArrayList();
	destinatarios.add(objeto.destinatario);
	log.info("Entrou no método de enviar e-mail")
	//Envia e-mail
	notifier.notify(getValue("WKUser"), "meu_template", parametros, destinatarios, "text/html");

}

function gerarPDF(objeto, processId){
	var clientService = fluigAPI.getAuthorizeClientService();

	var atributos = JSON.stringify(obterDadosFormulario(objeto, processId));
	var data = {
			companyId : getValue("WKCompany") + '',
			serviceCode : 'generator',
			endpoint : '/generator/pdf/generate',
			method : 'post',
			timeoutService: '100000000', // segundos
			params : {
				"atributos":atributos

			}
	}
	
	var vo = clientService.invoke(JSON.stringify(data));

	if(vo.getResult()== null || vo.getResult().isEmpty()){
		throw new Exception("Retorno está vazio");
	}else{
		log.info("Serviço retornou resultado válido");
		return vo.getResult();
	}
}

function obterDadosFormulario(objeto, processId){
	var conteudo = [];
	var mapaPaiFilho = new java.util.LinkedHashMap();
	var mapaCampos = new java.util.LinkedHashMap();
	var idDoc = getValue("WKNumProces"); //define o número do processo atual
	
	//armazena na variável "dataSet" os conteúdos da solicitação atual
	var c1 = DatasetFactory.createConstraint("documentid", idDoc, idDoc, ConstraintType.MUST);

	var dataSet = DatasetFactory.getDataset(objeto.dataset, null, [c1], null);
	log.info("Linhas do dataset: "+dataSet.rowsCount)
	if(dataSet != null){
		mapaCampos.put("titulo1", "Formulário Principal");
		var colunas = dataSet.getColumnsName();
		for(var i = 0; i <  colunas.length; i++){
			var aux = colunas[i].length();
				//se o nome da coluna conter o "metadata#" o codigo ignora
			if(!(aux > 7 && colunas[i].indexOf("metadata#") != -1)){
				if(objeto.filtro != null && objeto.filtro != ""){
					if(objeto.filtro.indexOf(colunas[i]) != -1){
						mapaCampos.put(colunas[i], hAPI.getCardValue(colunas[i]));
					}
				}else{
					mapaCampos.put(colunas[i],hAPI.getCardValue(colunas[i]));
				}
			}
		}
		log.info("Mapa campos: "+mapaCampos)
		if(objeto.mapaFiltroPaiFilho != null && objeto.mapaFiltroPaiFilho != ""){
			var mapaFiltroPaiFilho = objeto.mapaFiltroPaiFilho;
			var arrayFiltroPaiFilho = mapaFiltroPaiFilho.keySet().toArray();
			log.info("Vai entrar no for dos pai x filho")
			for(indice in arrayFiltroPaiFilho){
				var chave = arrayFiltroPaiFilho[indice];
				var valor = mapaFiltroPaiFilho.get(chave);
				log.info("Chave: "+chave);
				log.info("Valor: "+valor);
				if(!chave.startsWith("titulo")){
					mapaPaiFilho = montaMapaPaiFilho(processId, mapaPaiFilho, dataSet, objeto, chave, valor)
				}else{
					mapaPaiFilho.put(chave, valor)
				}
			}
			log.info("Mapa pai x filho: "+mapaPaiFilho);
			
			mapaCampos = mergeMaps(mapaPaiFilho, mapaCampos)
		}
		
		log.info("Novo mapa: "+mapaCampos)
		
		var arrayFinal = mapaCampos.keySet().toArray();
		
		for(colunaFinal in arrayFinal){
			var nomeColuna = arrayFinal[colunaFinal];
			conteudo.push("'"+nomeColuna+"':'"+mapaCampos.get(nomeColuna)+"'");
		}
		
		var json ="{"+conteudo.join(",")+"}";
		
		log.info("VALORES -> " + json);
		
		return json;
	}
	
}

function obterNomeDestinatario(destinatario){

	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", "%"+destinatario+"%", "%"+destinatario+"%", ConstraintType.MUST);
	c1.setLikeSearch(true);

	var usuario = DatasetFactory.getDataset("colleague", null, [c1], null);

	return usuario.getValue(0, "colleagueName");
}

function criarAnexo(factory, arrayBytes){
	var anexo = factory.createAttachment();	

	anexo.setFileName("formulario.pdf");
	anexo.setFilecontent(arrayBytes);
	anexo.setFileSize(arrayBytes.length);
	anexo.setPrincipal(true);

	return anexo;
}

function retornarNomeProcesso(processId){

	var c1 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", processId, processId, ConstraintType.MUST);

	var dsProcesso = DatasetFactory.getDataset("workflowProcess", null, [c1], null);

	return dsProcesso.getValue(0, "processId");

}

function retornarInfoGeracao(nomeProcesso){
	var c1 = DatasetFactory.createConstraint("NOMEPROCESSO", nomeProcesso, nomeProcesso, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	
	var dataset = DatasetFactory.getDataset("dsParametrizacao", null, constraints, null);
	var metaId = dataset.getValue(0, "metadata#id");
	var metaVersion = dataset.getValue(0, "metadata#version");
	
	var c1 = DatasetFactory.createConstraint("tablename", "tb_paifilho", "tb_paifilho", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#id", metaId, metaId, ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("metadata#version", metaVersion, metaVersion, ConstraintType.MUST)
	
	var datasetFilhos = DatasetFactory.getDataset("dsParametrizacao", null, [c1, c2, c3], null);
	
	var mapaFiltroPaiFilho = new java.util.LinkedHashMap();
	
	for(var i = 0; i < datasetFilhos.rowsCount; i++){
		var tableName = datasetFilhos.getValue(i, "nm_table");
		var nomeAlternativo = datasetFilhos.getValue(i, "nomeAlternativo");
		var filtroPaiFilho = datasetFilhos.getValue(i, "filtroPaiFilho");
		mapaFiltroPaiFilho.put("titulo"+(i+2), nomeAlternativo);
		mapaFiltroPaiFilho.put(tableName, filtroPaiFilho);
	}
	
	log.info("Filtro pai x filho: "+mapaFiltroPaiFilho)
	
	return factory(dataset, mapaFiltroPaiFilho)
	
}

function mergeMaps(mapaOrigem, mapaDestino){
	var arrayCamposOrigem = mapaOrigem.keySet().toArray();
	
	for(campoOrigem in arrayCamposOrigem){
		var coluna = arrayCamposOrigem[campoOrigem];
		var valor = mapaDestino.get(coluna);
		var reserved = mapaDestino.put(coluna, mapaOrigem.get(coluna));
		if(reserved != null){
			mapaDestino.remove(coluna);
			valor += ", "+mapaOrigem.get(coluna);
			mapaDestino.put(coluna, valor);
		}else{
			mapaDestino.put(coluna, mapaOrigem.get(coluna));
		}
	}
	
	return mapaDestino;
}

function factory(dataset, mapaFiltroPaiFilho){
	return {
			usuario : dataset.getValue(0, "usuario"),
			senha : dataset.getValue(0, "senha"),
			dataset: dataset.getValue(0, "nomeDataset"),
			pasta : dataset.getValue(0, "pasta"), 
			receberEmail : dataset.getValue(0, "receberEmail"),
			destinatario : dataset.getValue(0, "destinatario"),
			servidor: dataset.getValue(0, "servidor"),
			filtro:dataset.getValue(0, "filtro"),
			mapaFiltroPaiFilho : mapaFiltroPaiFilho
	}	
}

function montaMapaPaiFilho(processId, mapaPaiFilho, dataSet,objeto, chave, valor){
	var mapaCampos = hAPI.getCardData(processId);
	var tableName = chave;
	var metaId = mapaCampos.get("documentid");
	var metaVersion = mapaCampos.get("version");
	
	var c1 = DatasetFactory.createConstraint("tablename", tableName, tableName, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#id", metaId, metaId, ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("metadata#version", metaVersion, metaVersion, ConstraintType.MUST)
	
	
	var filhos = DatasetFactory.getDataset(objeto.dataset, null, [c1, c2, c3], null);
	var colunaFilhos = filhos.getColumnsName();
	var aux = 0;
	
	var nomeColunas = filtraColunas(colunaFilhos, valor)
	var arrayColunasFiltradas = nomeColunas.split(" - ");
	var titulo = nomeColunas;
	var linha="";
	for(var j = 0; j < filhos.rowsCount; j++){
		
		for(var i = 0; i < arrayColunasFiltradas.length; i++){
			if(linha){
				linha +=" - "+filhos.getValue(j, arrayColunasFiltradas[i]);
			}else{
				linha = filhos.getValue(j, arrayColunasFiltradas[i]);
			}
		}
		linha +=";";
		log.info("Linhas: "+linha);
		
		mapaPaiFilho.put(titulo, linha);
	}
	log.info("Mapa pai x filho: "+mapaPaiFilho)
	
	return mapaPaiFilho
}

function filtraColunas(colunaFilhos, valorFiltro){
	var nomeColunas;
	if(valorFiltro != null && valorFiltro != ""){
		nomeColunas = retornaStringNomeColunasComFiltro(colunaFilhos, valorFiltro);
	}else{
		nomeColunas = retornaStringNomeColunas(colunaFilhos);
	}
	
	return nomeColunas;
}

function retornaStringNomeColunasComFiltro(colunas, filtro){
	var retorno;
	log.info("Entrou no método com filtro: "+filtro);
	for(var i = 0; i < colunas.length; i++){
		if(filtro.indexOf(colunas[i]) != -1){
			if(retorno){
				retorno +=" - "+colunas[i]
			}else{
				retorno = colunas[i]
			}
		}
	}

	return retorno;
}

function retornaStringNomeColunas(colunas){
	var retorno;

	for(var i = 0; i < colunas.length; i++){
		if(retorno){
			retorno +=" - "+colunas[i]
		}else{
			retorno = colunas[i]
		}
	}

	return retorno;
}

