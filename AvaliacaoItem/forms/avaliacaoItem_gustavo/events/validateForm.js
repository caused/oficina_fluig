function validateForm(form){
	
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 4){
		if(form.getValue("item") == ""){
			throw("É necessário preencher o nome do item");
		}
		if(form.getValue("fornecedor") == ""){
			throw("É necessário preencher o fornecedor");
		}
		if(form.getValue("dataChegada") == ""){
			throw("É necessário preencher a data de chegada do item");
		}
		
	}
	
	if(atividade == 9){
		if(form.getValue("departamento") == ""){
			throw("É necessário preencher o departamento");
		}
		
		if(form.getValue("motivoAvaliacao") == ""){
			throw("É necessário preencher o motivo da avaliação");
		}
	}
}