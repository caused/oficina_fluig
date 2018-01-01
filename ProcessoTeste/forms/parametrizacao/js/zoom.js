function setSelectedZoomItem(selectedItem) {
	if(selectedItem.inputId == "NOMEPROCESSO"){
		var nomeProcesso = selectedItem.processId;
		var c1 = DatasetFactory.createConstraint("processDefinitionVersionPK.processId", nomeProcesso, nomeProcesso, ConstraintType.MUST);
		
		var datasetWorkflowProcess = DatasetFactory.getDataset("processDefinitionVersion", null, [c1], null)
		
		var formId = datasetWorkflowProcess.values[0].formId;
		
		
		c1 = DatasetFactory.createConstraint("documentPK.documentId", formId, formId, ConstraintType.MUST);
		var datasetDocument = DatasetFactory.getDataset("document", null, [c1], null);
		
		var nomeDataset = datasetDocument.values[0].datasetName;
		
		$("#nomeDataset").val(nomeDataset).trigger('input');
	}
	
}