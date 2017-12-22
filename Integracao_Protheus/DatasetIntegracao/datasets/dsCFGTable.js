function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	try{
		var protheusService = ServiceManager.getService("CFGTABLE");
		var serviceHelper = protheusService.getBean();
		var serviceLocator = serviceHelper.instantiate("br.com.microsiga.webservices.cfgtable_apw.CFGTABLELocator");
		var service = serviceLocator.getCFGTABLESOAP();
		
		var resultadoTableView = serviceHelper.instantiate("br.com.microsiga.webservices.cfgtable_apw.TABLEVIEW");
		
		var usuarioPadrao = fields[0];
		var alias = fields[1];
		var queryaddwhere = fields[2];
		var branch = fields[3];
		var listfieldview = fields[4];
		
		
		resultadoTableView = service.GETTABLE(usuarioPadrao, alias,queryaddwhere, branch,listfieldview);
			
		
		var arrayFieldView = serviceHelper.instantiate("br.com.microsiga.webservices.cfgtable_apw.ARRAYOFFIELDVIEW");
		var arrayFieldStruct = serviceHelper.instantiate("br.com.microsiga.webservices.cfgtable_apw.ARRAYOFFIELDSTRUCT");
		var arrayOfString = serviceHelper.instantiate("br.com.microsiga.webservices.cfgtable_apw.ARRAYOFSTRING");
		
		var tipo = new Array();
		
		arrayFieldView = resultadoTableView.getTABLEDATA();
		arrayFieldStruct = resultadoTableView.getTABLESTRUCT();
			 
		var fieldsStruct = arrayFieldStruct.getFIELDSTRUCT();
		for(var i=0; i< fieldsStruct.length;i++){
			tipo.push(fieldsStruct[i].getFLDTYPE());
			dataset.addColumn(fieldsStruct[i].getFLDNAME());
		}
			  
			  
		var fieldsView = arrayFieldView.getFIELDVIEW();
		var linha;
		for(var i =0;i < fieldsView.length; i++){
			linha = new Array();
			arrayOfString = fieldsView[i].getFLDTAG();
			var resultado = arrayOfString.getSTRING();
			 
			dataset.addRow(resultado);
	
		}
			  
			  
			
	}catch(erro){
		dataset.addRow(new Array(erro));
	}
	return dataset;
}

function onMobileSync(user) {

}