function validateForm(form){
	var atividade = getValue("WKNumState");
	
	if(atividade == 21){
		if(form.getValue("dataSolicitacao") == ""){
			throw ("É necessário escolher uma data!")
		}
	}
	
}