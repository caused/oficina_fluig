function validateForm(form){
	if (form.getValue("IDENTIFY") == "") {
		throw "Preencha o campo Código.";
		
	} else if (form.getValue("ORIGEM") == "") {
		throw "Preencha o campo Origem.";
	}
}