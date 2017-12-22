function validaEficacia(){
	
	var numProcess = getValue("WKNumProces").toString();
	var filter = new java.util.HashMap();	
	filter = hAPI.getCardData(parseInt(numProcess));
	var it = filter.keySet().iterator();
	
	log.info("=========================== " + filter + " ==================================");
	var eficaz = true;
	//Hash Map para armazenamento de Filhos...
	var hpFilhos = new java.util.HashMap();
	while (it.hasNext()) {	
		var key = it.next();
		log.info("[KGQ] ValidaEficacia - key "+key+" value "+filter.get(key));
		if (key.toUpperCase().indexOf('EFICAZ___') >= 0 && filter.get(key) == "Nao") {
			eficaz = false;
		} 
	}
	
	return eficaz;
}