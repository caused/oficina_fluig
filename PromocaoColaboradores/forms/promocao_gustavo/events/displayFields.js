function displayFields(form,customHTML){
	
	var nomeUsuario = getValue("WKUser");
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 5){
		
		customHTML.append("<script>");
			customHTML.append("$('#painel_aprovar_colaborador').hide();");
			customHTML.append("$('#entrevista_colaborador').hide();");
			customHTML.append("$('#textoValidarCorrecao').hide();");
		customHTML.append("</script>");
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", "%"+nomeUsuario+"%", "%"+nomeUsuario+"%", ConstraintType.MUST);
		c1.setLikeSearch(true);
		
		var constraints = new Array(c1);
		
		var dsUsuario = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		form.setValue("nomeColaborador", dsUsuario.getValue(0, "colleagueName"));
		form.setValue("emailColaborador", dsUsuario.getValue(0, "mail"));
		
		form.setVisible("vagaColaborador", false);
		form.setVisible("gestorColaborador", false);
		form.setVisible("unidadeColaborador", false);
		
		
	}
	
	if(atividade == 6){
		form.setValue("vagaColaborador", form.getValue("vagaColaboradorZoom"));
		form.setValue("gestorColaborador", form.getValue("gestorColaboradorZoom"));
		form.setValue("unidadeColaborador", form.getValue("unidadeColaboradorZoom"));
		
		customHTML.append("<script>");
			customHTML.append("$('#entrevista_colaborador').hide();");
			customHTML.append("$('#textoValidarCorrecao').hide();");
		customHTML.append("</script>");
	}

	
	if(atividade == 11 || atividade == 16){
		
		customHTML.append("<script>");
			customHTML.append("$('#painel_aprovar_colaborador').hide();");
			customHTML.append("$('#formulario_colaborador').hide();");
			customHTML.append("$('#textoValidarCorrecao').hide();");
		customHTML.append("</script>");
	}
	
	if(atividade == 24){
		customHTML.append("<script>");
			customHTML.append("$('#painel_aprovar_colaborador').hide();");
			customHTML.append("$('#entrevista_colaborador').hide();");
			customHTML.append("$('#formulario_colaborador').hide();");
		customHTML.append("</script>");
	}
	
	
}
