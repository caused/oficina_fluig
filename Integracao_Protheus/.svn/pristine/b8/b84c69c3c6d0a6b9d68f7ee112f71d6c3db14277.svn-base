function defineStructure() {
	addColumn("B1_COD");
	addColumn("B1_DESC");
	addColumn("B1_UM");
	addColumn("B1_CUSTD");
	
	setKey([ "B1_COD", "B1_DESC" ]);
    addIndex([ "B1_COD" ]);

}
function onSync(lastSyncDate) {
	
	var newDataset = DatasetBuilder.newDataset();
	
	var nomeDataset = "dsCFGTable";
	var fields = ["MSALPHA", "SB1", "", "", "B1_COD, B1_DESC, B1_UM, B1_CUSTD"];
		
	var dataset = DatasetFactory.getDataset(nomeDataset,fields , null, null);
	
	for(var i=0; i<dataset.rowsCount; i++){
		
		newDataset.addOrUpdateRow(new Array(dataset.getValue(i, "B1_COD"), dataset.getValue(i, "B1_DESC"), dataset.getValue(i, "B1_UM"), dataset.getValue(i, "B1_CUSTD")));
	}
	
	
	return newDataset;
}
function createDataset(fields, constraints, sortFields) {


}function onMobileSync(user) {

}