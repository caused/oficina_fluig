function afterProcessFinish(processId){
	log.info("ID do processo: "+processId);

	var nomeProcesso = retornarNomeProcesso(processId);
	
	var objeto = retornarInfoGeracao(nomeProcesso);
	
	if(objeto){
		var documentId = anexarDocumento(objeto)
		log.info("ID do documneto: "+documentId);
		log.info("Receber e-mail: "+objeto.receberEmail)
		if(documentId && objeto.receberEmail == "Sim"){
			enviaEmail(documentId, processId, objeto);
		}
	}else{
		throw ("Não foi possível gerar o PDF desta solicitação. Por favor, preencha o formulário de pré-cadastro localizado no GED.");
	}
}

function anexarDocumento(objeto){
	var documentId;
	var pastaDestino = objeto.pasta;
	var usuarioAdmin = objeto.usuario;
	var senha = objeto.senha;
	try{		
		var file = gerarPDF(objeto);

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

	//Monta mapa com parâmetros do template
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

function gerarPDF(objeto){
	var clientService = fluigAPI.getAuthorizeClientService();

	var atributos = JSON.stringify(obterDadosFormulario(objeto));
	var data = {
			companyId : getValue("WKCompany") + '',
			serviceCode : 'generator',
			endpoint : '/generator/pdf/generate',
			method : 'post',
			timeoutService: '100', // segundos
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

function obterDadosFormulario(objeto){
	var conteudo = [];

	var idDoc = getValue("WKNumProces");

	var c1 = DatasetFactory.createConstraint("documentid", idDoc, idDoc, ConstraintType.MUST);

	dataSet = DatasetFactory.getDataset(objeto.dataset, null, [c1], null);

	if(dataSet != null){

		//retorna um array com os nome das colunas		
		var colunas = dataSet.getColumnsName();

		//percorre o dataset
		for(var i = 0; i< colunas.length; i++){

			var aux = colunas[i].length();

			//se o nome da coluna conter o "metadata#" o codigo ignora
			if(!(aux > 7 && colunas[i].indexOf("metadata#") != -1) && hAPI.getCardValue(colunas[i]) != null){
				log.info("Filtro: "+objeto.filtro)
				if(objeto.filtro != null && objeto.filtro != ""){
					if(objeto.filtro.indexOf(colunas[i]) != -1){
						conteudo.push("'"+colunas[i]+"':'"+hAPI.getCardValue(colunas[i])+"'");
					}
				}else{
					conteudo.push("'"+colunas[i]+"':'"+hAPI.getCardValue(colunas[i])+"'");
				}
			}

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
	
	var dataset = DatasetFactory.getDataset("dsParametrizacao", null, [c1, c2], null);
	
	var objeto = {
			usuario : dataset.getValue(0, "usuario"),
			senha : dataset.getValue(0, "senha"),
			dataset: dataset.getValue(0, "nomeDataset"),
			pasta : dataset.getValue(0, "pasta"), 
			receberEmail : dataset.getValue(0, "receberEmail"),
			destinatario : dataset.getValue(0, "destinatario"),
			servidor: dataset.getValue(0, "servidor"),
			filtro:dataset.getValue(0, "filtro")
	}
	
	return objeto;
}

