function displayFields(form,customHTML){ 
	
	var atividade = getValue("WKNumState");
	
	var numeroProcesso = getValue("WKNumProces");
	
	if(atividade == 0 || atividade == 8){
		customHTML.append("<script>");
			customHTML.append("$('#perguntas').hide();");
			customHTML.append("$('#correcao').hide();");
		customHTML.append("</script>");
	}
	
	if(atividade == 4){
		var c1 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", "%"+numeroProcesso+"%", "%"+numeroProcesso+"%", ConstraintType.MUST);
		c1.setLikeSearch(true);
		var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("workflowProcess", null, constraints, null)
		
		processoPai = dataset.getValue(0, "sourceProcess");
		log.info("Processo pai: "+processoPai);
		
		form.setValue("processoPai", processoPai);
		
		customHTML.append("<script>");
			customHTML.append("$('section#correcao').hide();");
		customHTML.append("</script>");
	}
	
	if(atividade == 6){
		customHTML.append("<script>");
			customHTML.append("$('#perguntas').hide();");
		customHTML.append("</script>");
	}
	
	
}