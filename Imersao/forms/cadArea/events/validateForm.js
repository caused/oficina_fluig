function validateForm(form){
	if (form.getValue("AREA") == "") {
		throw "Preencha o campo Área.";
		
	} else if (form.getValue("UNIDADE") == "") {
		throw "Preencha o campo Unidade.";
		
	}
}