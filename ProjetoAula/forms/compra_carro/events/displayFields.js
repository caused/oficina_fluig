function displayFields(form,customHTML){
	customHTML.append("<script>var currentState = parseInt("+getCurrentState()+")</script>");
	
	var currentState = parseInt(getCurrentState());
	
	if(currentState == 5){
		form.setEnabled("nome", false);
		form.setEnabled("dataNascimento", false);
		form.setEnabled("marca", false);
		form.setEnabled("modelo", false);
		form.setEnabled("valor", false);
	}
}

function getCurrentState(){
	return getValue("WKNumState");
}