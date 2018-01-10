function montarPaiFilho(nomeDataset, companyId){
	customWdkRemoveChild($("input[id^='nm_table___']"))
	var ds_TableNames = DatasetFactory.getDataset("ds_TableName", [nomeDataset, companyId], null, null);
	
	if(ds_TableNames.values.length > 0){
		for(var i = 0; i < ds_TableNames.values.length; i++){
			var tableName =  ds_TableNames.values[i].tablename
			console.log(tableName);
			
			if(tableName){
				var c1 = DatasetFactory.createConstraint("tablename", tableName, tableName, ConstraintType.MUST);
				
				var constraintFilhos = new Array(c1);
				
				var dsFilhos = DatasetFactory.getDataset(nomeDataset, null, constraintFilhos, null);
				
				var newId = wdkAddChild("tb_paifilho");
				
				$("#nm_table___"+newId).val(tableName).attr("readonly", true);
				autoComplete(dsFilhos.columns, "#filtroPaiFilho___"+newId);
			}
			
		}
	}
}

function customWdkRemoveChild(elements){
	elements.each(function(index, el){
		$(el).closest("tr").remove();
	});
}


