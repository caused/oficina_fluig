function displayFields(form,customHTML){
	
	var atividade = getValue("WKNumState");
	log.info("ID da atividade: "+atividade);
	if(atividade == 4 || atividade == 0){
		customHTML.append("<script>");
			customHTML.append("$('#divJogador').hide();");
			customHTML.append("$('#salarioJogador').hide();");
			customHTML.append("$('#jogadorApto').hide();");
			customHTML.append("$('#dataSolicitacao').hide();");
			customHTML.append("$('#diagnostico').hide();");
			customHTML.append("$('#nomeMedico').hide();");
		customHTML.append("</script>");
	}
	
	if(atividade == 21){
		customHTML.append("<script>");
			customHTML.append("$('#jogadorApto').hide();");
			customHTML.append("$('#diagnostico').hide();");
			customHTML.append("$('#nomeMedico').hide();");
		customHTML.append("</script>");
	}
	
	if(atividade == 10){
		customHTML.append("<script>");
			customHTML.append("$('#divJogador').hide();");
			customHTML.append("$('#salarioJogador').hide();");
			customHTML.append("$('#dataSolicitacao').hide();");
		customHTML.append("</script>");
	}
	
	if(atividade == 14 || atividade == 16){
		customHTML.append("<script>");
		customHTML.append("$('#divJogador').attr('disabled', 'disabled');");
		customHTML.append("$('#jogadorApto').attr('disabled', 'disabled');");
		customHTML.append("$('#salarioJogador').attr('disabled', 'disabled');");
		customHTML.append("$('#dataSolicitacao').attr('disabled', 'disabled');");
		customHTML.append("$('#diagnostico').attr('disabled', 'disabled');");
		customHTML.append("$('#nomeMedico').attr('disabled', 'disabled');");
	customHTML.append("</script>");
	}
}