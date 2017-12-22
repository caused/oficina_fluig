function needContention(){
	var checked = hAPI.getCardValue("fgContencao")=="on";

	log.info("================NECESSITA CONTENCAO?  " + checked + " ==================");
	return checked;
}