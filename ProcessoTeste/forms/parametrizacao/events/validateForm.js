function validateForm(form){
	
	
	
	if(form.getValue("NOMEPROCESSO") == null){
		throw ("É obrigatório definir o processo que receberá essas informações");
	}
	
	if(processoJaCadastrado(form.getValue("NOMEPROCESSO"))){
		throw ("Já existe registro desse formulário para o processo: "+form.getValue("NOMEPROCESSO"))
	}
	
	if(isNullOrEmpty(form, "nomeDataset")){
		throw ("O nome do dataset é obrigatório");
	}
	
	if(form.getValue("usuario") == null){
		throw ("O nome do usuário é obrigatório");
	}
	
	if(isNullOrEmpty(form, "senha")){
		throw ("A senha é obrigatória");
	}
	
	if(form.getValue("pasta") == null){
		throw ("A pasta de destino é obrigatória");
	}
	
	if(isNullOrEmpty(form, "receberEmail")){
		throw ("O usuário deve escolher se irá receber e-mail ou não");
	}
	
	if(form.getValue("receberEmail") == "Sim"){
		if(form.getValue("destinatario") == null){
			throw("É necessário escolher um destinatário para receber os e-mails");
		}
	}
}

function processoJaCadastrado(nomeProcesso){
	var c1 = DatasetFactory.createConstraint("NOMEPROCESSO", nomeProcesso, nomeProcesso, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("dsParametrizacao", null, [c1, c2], null);

	return dataset.rowsCount > 0;
}

function isNullOrEmpty(form, name){
	return (form.getValue(name) == null || form.getValue(name).trim().isEmpty());
}