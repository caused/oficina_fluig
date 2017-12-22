function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Código");
	dataset.addColumn("Nome");
	dataset.addColumn("Cidade");
	
	var c1 = DatasetFactory.createConstraint("nome", "%João%", "%João%", ConstraintType.SHOULD);
	c1.setLikeSearch(true);
	var c2 = DatasetFactory.createConstraint("nome", "%Maria%", "%Maria%", ConstraintType.SHOULD);
	c2.setLikeSearch(true);
	
	var constraint = new Array(c1, c2);
	
	var dsDesafio = DatasetFactory.getDataset("ds_formulario_desafio_bpm_gustavo", null, constraint, null);
	
	var resultado = dsDesafio.toResultSet();
	
	while(resultado.next()){
		var codigo = resultado.getString("codigo");
		var nome = resultado.getString("nome");
		var cidade = resultado.getString("cidade");
		
		dataset.addRow(new Array(codigo, nome, cidade));
	}
	
	return dataset;
}

function onMobileSync(user) {

}