function beforeStateEntry(sequenceId){
	
	var atividade = getValue("WKNumState");
	var processo = getValue("WKNumProces");
	
	
	if(sequenceId == 24){
		log.info("Entrei no evento de workflow")
		var c1 = DatasetFactory.createConstraint("processoPai", "%"+processo+"%", "%"+processo+"%", ConstraintType.MUST);
		c1.setLikeSearch(true);
		var constraints = new Array(c1);
		
		//Esse nome de dataset deve ser o mesmo do dataset associao ao formulario de avaliacao de colaboradores
		var dataset = DatasetFactory.getDataset("dsAvaliacaoColaboradores_gustavo", null, constraints, null);
				
		var setResultados = dataset.toResultSet();
		
		while(setResultados.next()){
			if(setResultados.getString("aprovado_qualificacao") != null){
				resposta = setResultados.getString("aprovado_qualificacao");
			}
		}
		
		hAPI.setCardValue("aprovado_prova", resposta);
		
	}
}