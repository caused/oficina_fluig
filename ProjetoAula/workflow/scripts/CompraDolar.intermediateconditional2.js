function intermediateconditional2() {
	
	var valorDesejado = hAPI.getCardValue("valorDesejado");
	
	var datasetCotacao = DatasetFactory.getDataset("ds_Dolar", null, null, null);
	var valorAtual = datasetCotacao.getValue(0, "dolar");
	
	if(valorAtual <= valorDesejado){
		return true;
	}

}