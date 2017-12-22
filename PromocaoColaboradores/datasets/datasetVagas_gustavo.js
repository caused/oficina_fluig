function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Vaga");
	dataset.addColumn("Área");
	dataset.addColumn("Gestor");
	
	
	dataset.addRow(new Array("Analista II de Serviços", "DRG-SP", "Rogério Rodrigues"));
	dataset.addRow(new Array("Analista III de Serviços", "Private", "Vitor Tadashi"));
	dataset.addRow(new Array("Analista I de Desenvolvimento de Software", "Fluig", "Richard Bacon"));
	dataset.addRow(new Array("Analista II de Implantação", "Protheus", "Rafael Aro"));
	dataset.addRow(new Array("Analista II de Golang", "Cloud", "Gérson"));
	
	return dataset;
	

}function onMobileSync(user) {

}