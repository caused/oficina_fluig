function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Produto");
	dataset.addColumn("Valor");
	
	dataset.addRow(new Array("Xbox One", "2000"));
	dataset.addRow(new Array("Playstation 4", "1800"));
	dataset.addRow(new Array("Geladeira", "5000"));
	dataset.addRow(new Array("Armário", "800"));
	dataset.addRow(new Array("Hack", "2300"));
	dataset.addRow(new Array("Notebook","2650"));
	
	return dataset;
	
}function onMobileSync(user) {

}