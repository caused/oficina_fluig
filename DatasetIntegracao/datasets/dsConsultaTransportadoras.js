function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetFactory.getDataset("dsCFGTable", ["MSALPHA", "SA4", "", "", "A4_NOME,A4_VIA, A4_HPAGE, A4_TPTRANS"], null, null)
	
	return dataset;

}function onMobileSync(user) {

}