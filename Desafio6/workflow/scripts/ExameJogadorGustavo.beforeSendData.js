function beforeSendData(customFields,customFacts){
	
	
	log.info("**************Lendo atributos");
	customFields[0] = hAPI.getCardValue("jogador");
	customFields[1] = hAPI.getCardValue("jogadorApto");
	customFields[2] = hAPI.getCardValue("dataSolicitacao");
	customFields[3] = hAPI.getCardValue("diagnostico");
	customFields[4] = hAPI.getCardValue("nomeMedico");
	
	customFacts[0] = java.lang.Double.parseDouble(hAPI.getCardValue("salarioJogador"));
}
