function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("ID");
	dataset.addColumn("Nome");
	dataset.addColumn("Tipo");
	
	var consumer = oauthUtil.getGenericConsumer("91d3f4c4-2928-11e8-b467-0ed5f89f718b", "a00c8c7c-2928-11e8-b467-0ed5f89f718b",
            "f81f1e8b-448f-4816-9277-2ec73b95ddf4",
            "62d1e078-a5ea-4504-97c0-666bb8d287b676ade093-9a1b-46cd-8449-914781baf231");
	
	var retorno = JSON.parse(consumer.get("http://10.172.83.83:8080/lms/api/v1/accounts"));
	if(retorno){
		var contas = retorno.items
		for(var i = 0; i < contas.length; i++){
			var id = contas[i].id;
			var nome = contas[i].name;
			var tipo = contas[i].type;
			dataset.addRow([id, nome, tipo])
		}
	}
	
	return dataset;
}