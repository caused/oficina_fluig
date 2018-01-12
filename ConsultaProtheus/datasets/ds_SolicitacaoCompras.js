function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	try{
		if(fields != null){
			
			var serviceManager = ServiceManager.getService("SolicitacaoCompras");
			var serviceHelper = serviceManager.getBean();
			var locator = serviceHelper.instantiate("br.com.fluig.WSAPROVACAOSOLICITACAOCOMPRALocator");
			var service = locator.getWSAPROVACAOSOLICITACAOCOMPRASOAP();
			
			var requisicao = serviceHelper.instantiate("br.com.fluig.STREQUISICAO");
			requisicao.setCNPJ(fields[0]);
			requisicao.setFILIAL(fields[1]);
			requisicao.setNUMSC(fields[2]);
			requisicao.setSTATUS(fields[3]);
			requisicao.setEMPRESA(fields[4]);
			
			
			var resposta = service.APROVA(requisicao);
			dataset.addColumn("Retorno serviço")
			dataset.addRow([resposta]);
		}else{
			throw "Informe os campos";
		}
	
	}catch(Erro){
		dataset.addColumn("INFO")
		dataset.addRow(new Array("Erro: "+Erro));
	}
	
	return dataset;

}function onMobileSync(user) {

}