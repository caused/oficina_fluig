function validateForm(form){
	if (form.getValue("CRITICIDADE") == "") 
		throw "Preencha o campo Criticidade.";
		
}