function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var cnpj = "11111111111111";
	var filial = "01";
	var numsc = "000002";
	var status = "R";
	var empresa = "99";
	
	var fields = [cnpj, filial, numsc, status, empresa];
	
	return DatasetFactory.getDataset("ds_SolicitacaoCompras", fields, null, null);

}function onMobileSync(user) {

}