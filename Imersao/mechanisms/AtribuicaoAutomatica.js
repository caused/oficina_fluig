function resolve(process,colleague){

	var userList = new java.util.ArrayList();
	var responsaveis = hAPI.getCardValue("responsaveis").split(";");
	
	for(var i=0; i< responsaveis.length; i++){
		userList.add(responsaveis[i]);
	}

	return userList;

}