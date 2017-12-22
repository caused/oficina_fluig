function afterProcessCreate(processId){
	hAPI.setCardValue("cdOcorrencia", processId);
	hAPI.setCardValue("status", "Ativo");
	log.info("Iniciando processo de ocorrência....");
}