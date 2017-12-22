function displayFields(form,customHTML){ 
log.info("====================== DISPLAY FIELDS ======================" );
	form.setShowDisabledFields(true); 
	form.setHidePrintLink(true);
	
	customHTML.append("<script>function getCurrentUser(){ return '" + getValue("WKUser") + "';}</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "';}</script>");
	
	var numActivity = getValue("WKNumState");
	log.info("Numero da Atividade: " + numActivity);
	var INICIO_SOLICITACAO = 0;
	var ATIVIDADE_INICIAL = 1;
	var ANALISAR_CAUSA = 5;
	var EXECUTAR_PLANO = 25;
	var VERIFICAR_EFICACIA = 9;
	var NOTIFICAR = 10;
	
	if(numActivity == ATIVIDADE_INICIAL || numActivity == INICIO_SOLICITACAO) {
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);

		form.setValue('nmUsuario', colaborador.getValue(0, "colleagueName"));
		form.setValue('matriculaUsuario', colaborador.getValue(0, "colleaguePK.colleagueId"));

		var data = getFormatedDate();
		
		form.setValue('dtRegistro',data);
		if (numActivity == INICIO_SOLICITACAO) {
			form.setValue('dtOcorrencia',data);
		}
		
		customHTML.append("<script>$(function(){");
			customHTML.append("$('#divAnalise').hide();");
			customHTML.append("$('.campoEspelhoZoom').hide();");
		customHTML.append("})</script>");
	}else if(numActivity == ANALISAR_CAUSA){
		form.setValue('responsavelRegistroPlano',getValue("WKUser"));
		
		form.setValue("nmArea", form.getValue("nmAreaZoom"));
		form.setValue("cdOcorrenciaReincidente", form.getValue("cdOcorrenciaReincidenteZoom"));
		form.setValue("nmCriticidade", form.getValue("nmCriticidadeZoom"));
		form.setValue("nmOrigem", form.getValue("nmOrigemZoom"));
		
		
		customHTML.append("<script>$(function(){");
			customHTML.append("$('.campoZoom').hide();");
			customHTML.append("$('.paiFilho').hide();");
			customHTML.append("$('.campoEspelhoZoom input').attr('disabled', true);");
		customHTML.append("})</script>");
		
	}else if(numActivity == EXECUTAR_PLANO || numActivity == NOTIFICAR || numActivity == VERIFICAR_EFICACIA){
		
		var responsaveis = form.getValue("responsaveis").split(";");
		
		for(var i = 0; i < responsaveis.length; i++){
			form.setValue("w2Responsavel___"+(i+1), form.getValue("w2___"+(i+1)))
		}
		
		form.setValue("nmArea", form.getValue("nmAreaZoom"));
		form.setValue("cdOcorrenciaReincidente", form.getValue("cdOcorrenciaReincidenteZoom"));
		form.setValue("nmCriticidade", form.getValue("nmCriticidadeZoom"));
		form.setValue("nmOrigem", form.getValue("nmOrigemZoom"));
		
		customHTML.append("<script>$(function(){");
			customHTML.append("$('.campoZoom').hide();");
			customHTML.append("$('.paiFilho input').attr('disabled', true);");
			customHTML.append("$('.paiFilhoZoom').hide();");
			customHTML.append("$('.campoEspelhoZoom input').attr('disabled', true);");
		customHTML.append("})</script>");
	}

	log.info("right before customHTML")
	customHTML.append("<script>function getWKNumState(){ return '" + getValue("WKNumState") + "'; }</script>");

}

function getFormatedDate(){
	var fullDate = new Date();
	var hours = fullDate.getHours();
	var minutes = fullDate.getMinutes();
	
	if (minutes <= 9) 
		minutes = "0" + minutes; 
	
	var timeValue = hours + ":" + minutes;
	var date = fullDate.getDate().toString();
	
	if(date.length == 1) 
		date = 0+date; 
	
	var mes = (fullDate.getMonth()+1).toString();	
	
	if(mes.length == 1)
		mes = 0+mes; 
	
	return  date+"/"+mes+"/"+fullDate.getFullYear();
}