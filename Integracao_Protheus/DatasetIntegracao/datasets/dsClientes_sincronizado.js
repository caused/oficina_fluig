function defineStructure() {
	addColumn("A1_NOME");
	addColumn("A1_LOJA");
	addColumn("A1_END");
	addColumn("A1_BAIRRO");
	
	setKey(["A1_NOME"]);
}
function onSync(lastSyncDate) {
	
	var newDataset = DatasetBuilder.newDataset();
	
	var dataset = DatasetFactory.getDataset("dsCFGTable", ["MSALPHA", "SA1", "", "", "A1_NOME,A1_LOJA, A1_END, A1_BAIRRO"], null, null)
	
	for(var i=0; i<dataset.rowsCount; i++){
		newDataset.addRow(new Array(dataset.getValue(i, "A1_NOME"),dataset.getValue(i, "A1_LOJA"), dataset.getValue(i, "A1_END"), dataset.getValue(i, "A1_BAIRRO") ))
	}
	
	return newDataset;
}
function createDataset(fields, constraints, sortFields) {
	
	

}function onMobileSync(user) {

}