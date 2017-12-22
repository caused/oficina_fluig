function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Código");
	dataset.addColumn("Nome");
	
	dataset.addRow(new Array("1", "RH"));
	dataset.addRow(new Array("2", "Financeiro"));
	dataset.addRow(new Array("3", "Suporte - TI"));
	dataset.addRow(new Array("4", "Infraestrutura - TI"));
	dataset.addRow(new Array("5", "Diretoria"));
	dataset.addRow(new Array("6", "Projetos"));
	dataset.addRow(new Array("7", "Limpeza"));
	
	return dataset;

}function onMobileSync(user) {

}