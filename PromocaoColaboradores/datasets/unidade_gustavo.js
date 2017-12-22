function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Unidade");
	
	dataset.addRow(new Array("Unidade Matriz - São Paulo"));
	dataset.addRow(new Array("Unidade Santos"));
	dataset.addRow(new Array("Unidade Rio de Janeiro"));
	dataset.addRow(new Array("Unidade Porto Alegre"));
	dataset.addRow(new Array("Unidade Recife"));
	dataset.addRow(new Array("Unidade Belo Horizonte"));
	dataset.addRow(new Array("Unidade Manaus"));
	dataset.addRow(new Array("Unidade Rio Branco"));
	dataset.addRow(new Array("Unidade Curitiba"));
	
	return dataset;

}function onMobileSync(user) {

}