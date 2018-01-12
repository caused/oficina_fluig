function enableFields(form){ 
	var atividade = getValue("WKNumState");
	
	if(atividade == 9){
		form.setEnabled("cnpj", false);
		form.setEnabled("filial", false);
		form.setEnabled("numsc", false);
		form.setEnabled("status", false);
		form.setEnabled("empresa", false);
	}
	
}