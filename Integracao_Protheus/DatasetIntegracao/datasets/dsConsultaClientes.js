function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetFactory.getDataset("dsCFGTable", ["MSALPHA", "SA1", "", "", "A1_NOME,A1_LOJA, A1_END, A1_BAIRRO"], null, null)
	
	return dataset;

}
function onMobileSync(user) {

}