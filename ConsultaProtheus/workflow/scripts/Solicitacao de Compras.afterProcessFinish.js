function afterProcessFinish(processId){
	var cnpj = hAPI.getCardValue("cnpj");
	var filial = hAPI.getCardValue("filial");
	var numsc = hAPI.getCardValue("numsc");
	var status = hAPI.getCardValue("status");
	var empresa = hAPI.getCardValue("empresa");
	
	var fields = new Array(cnpj, filial, numsc, status, empresa);
	
	DatasetFactory.getDataset("ds_SolicitacaoCompras", fields, null, null);
}