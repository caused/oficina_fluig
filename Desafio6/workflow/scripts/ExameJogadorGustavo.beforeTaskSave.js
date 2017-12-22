function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var atividade = getValue("WKNumState");
	log.info("ID da atividade: "+atividade);
	if(atividade == 10){
		var diagnostico = hAPI.getCardValue("diagnostico");
		
		if(diagnostico == ""){
			throw("É de suma importância que você descreva o diagnóstico do paciente");
		}
	}
}