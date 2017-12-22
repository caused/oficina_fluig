function enableFields(form){
	var atividade = getValue("WKNumState");
	
	if(atividade == 6){
		form.setEnabled("nomeColaborador", false);
		form.setEnabled("vagaColaborador", false);
		form.setEnabled("gestorColaborador", false);
		form.setEnabled("unidadeColaborador", false);
		form.setEnabled("dataColaborador", false);
		form.setEnabled("emailColaborador", false);
		form.setEnabled("telefoneColaborador", false);
		form.setEnabled("qualificacaoColaborador", false);
		form.setEnabled("nivelColaborador", false);
	}
	
	if(atividade == 16){
		form.setEnabled("perfilComportamental", false);
		form.setEnabled("perfilTecnico", false);
		form.setEnabled("evolucao", false);
		form.setEnabled("comentarios", false);
	}
	
}