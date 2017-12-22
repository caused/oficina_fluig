function afterProcessFinish(processId){
	hAPI.setCardValue("status", "Finalizado");
	log.info("Finalizando processo de ocorrência....");
	
	log.info("ID do processo: "+processId);

	var documentId = anexarDocumento()

	if(documentId){
		enviaEmail(documentId, processId, getValue("WKUser"));
	}
}
function anexarDocumento(){
	log.info("Entrei no anexar documento");
	var documentId;
	var pastaDestino = 164;
	var usuarioAdmin = "admin";
	var senha = "gustavo@123";
	try{		
		var file = gerarPDF();

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

function enviaEmail(documentId,processId, destinatario){

	var url = fluigAPI.getDocumentService().getDownloadURL(documentId);

	//Monta mapa com parâmetros do template
	var parametros = new java.util.HashMap();
	parametros.put("SERVER_URL","http://spon010113228:8080");
	parametros.put("TENANT_ID", getValue("WKCompany"));
	parametros.put("RECEIVER", obterNomeDestinatario(destinatario));
	parametros.put("processo", processId);
	parametros.put("link_download", url);

	//Este parâmetro é obrigatório e representa o assunto do e-mail
	parametros.put("subject", "Retorno do processo");

	//Monta lista de destinatários
	var destinatarios = new java.util.ArrayList();
	destinatarios.add(destinatario);
	log.info("Entrou no método de enviar e-mail")
	//Envia e-mail
	notifier.notify(getValue("WKUser"), "meu_template", parametros, destinatarios, "text/html");

}

function gerarPDF(){
	var clientService = fluigAPI.getAuthorizeClientService();

	var atributos = JSON.stringify(obterDadosFormulario());
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

function obterDadosFormulario(){
	var conteudo = [];

	var idDoc = getValue("WKNumProces");

	var c1 = DatasetFactory.createConstraint("documentid", idDoc, idDoc, ConstraintType.MUST);

	dataSet = DatasetFactory.getDataset("ecm_kgq_ro", null, [c1], null);

	if(dataSet != null){

		//retorna um array com os nome das colunas		
		var colunas = dataSet.getColumnsName();

		//percorre o dataset
		for(var i = 0; i< colunas.length; i++){

			var aux = colunas[i].length();

			//se o nome da coluna conter o "metadata#" o codigo ignora
			if(aux > 7 && colunas[i].indexOf("metadata#") != -1){

			}
			else{

				conteudo.push("'"+colunas[i]+"':'"+hAPI.getCardValue(colunas[i])+"'");
			}


		}
		

		
		var SUPERconteudo ="{"+conteudo.join(",")+"}";
		
		log.info("VALORES -> " + SUPERconteudo);
		
		return SUPERconteudo;
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

