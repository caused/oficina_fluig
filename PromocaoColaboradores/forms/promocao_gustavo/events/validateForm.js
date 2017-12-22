function validateForm(form){
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 5){
		if(form.getValue("vagaColaboradorZoom") == null){
			throw("Por favor, selecione a vaga que deseja concorrer");
		}
		
		if(form.getValue("unidadeColaboradorZoom") == null){
			throw("Por favor, selecione a unidade em que você trabalha");
		}
		
		if(form.getValue("gestorColaboradorZoom") == null){
			throw("Por favor, seu gestor");
		}
	}
	
	if(atividade == 6){
		if(form.getValue("aprovado_qualificacao") == ""){
			throw("Selecine uma ação a ser tomada");
		}
		
		if(form.getValue("modalidadeProva") == ""){
			throw("Selecine a modalidade da prova");
		}
	}
	
	if(atividade == 11){
		if(form.getValue("perfilComportamental") == ""){
			throw("Por favor, descreva o perfil comportamental do candidato");
		}
		
		if(form.getValue("perfilTecnico") == ""){
			throw("Por favor, descreva o perfil comportamental do candidato");
		}
		
		if(form.getValue("evolucao") == ""){
			throw("Por favor, descreva o perfil comportamental do candidato");
		}
	}
}