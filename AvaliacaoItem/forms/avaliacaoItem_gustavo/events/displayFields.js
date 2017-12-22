function displayFields(form,customHTML){
	
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 4){
		customHTML.append("<script>");
			customHTML.append("$('#tabelaInformacoes').hide();");
			customHTML.append("$('#divAcao').hide();");
			customHTML.append("$('#divDepartamento').hide();");
			customHTML.append("$('#painelAvaliacao').hide();");
			customHTML.append("$('#botoesRecusar').hide();");
		customHTML.append("</script>");
		
		form.setVisible("acaoRecusar", false);
	}
	
	
	if(atividade == 9){
		customHTML.append("<script>");
			customHTML.append("$('#divItem').hide();");
			customHTML.append("$('#divFornecedor').hide();");
			customHTML.append("$('#botoesRecusar').hide();");
			customHTML.append("$('#recusarItem').hide();");
		customHTML.append("</script>");
		
		form.setVisible("acaoRecusar", false);
	}
	
	if(atividade == 15){
		customHTML.append("<script>");
			customHTML.append("$('#divItem').hide();");
			customHTML.append("$('#divFornecedor').hide();");
			customHTML.append("$('#botoesAvaliar').hide();");
			customHTML.append("$('#avaliarItem').hide();");
			customHTML.append("$('#divAcao').hide();");
		customHTML.append("</script>");
		
		form.setEnabled("motivoAvaliacao", false);
		form.setEnabled("departamento", false);
		form.setVisible("acaoRecusar", false);
		
	}
	
	if(atividade == 19){
		customHTML.append("<script>");
			customHTML.append("$('#divItem').hide();");
			customHTML.append("$('#divFornecedor').hide();");
			customHTML.append("$('#botoesAvaliar').hide();");
			customHTML.append("$('#avaliarItem').hide();");
			customHTML.append("$('#divAcao').hide();");
		customHTML.append("</script>");
	
		form.setEnabled("motivoAvaliacao", false);
		form.setEnabled("departamento", false);
		form.setVisible("acaoRecusar", false);
	}
}