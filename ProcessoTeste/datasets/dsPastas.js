function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("documentId");
	dataset.addColumn("documentDescription");
	
	var c1 = DatasetFactory.createConstraint("privateDocument", false, false, ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("documentType", 1, 1, ConstraintType.MUST)
	
	var constraints = new Array(c1, c2);
	
	var documentos =  DatasetFactory.getDataset("document", null, constraints, null);
	
	for(var i = 0; i < documentos.rowsCount ; i++){
		dataset.addRow(new Array(documentos.getValue(i, "documentPK.documentId"),documentos.getValue(i, "documentDescription") ))
	}
	
	return dataset;
}