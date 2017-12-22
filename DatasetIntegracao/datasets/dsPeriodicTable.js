function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("ElementName");
	dataset.addColumn("Symbol");
	dataset.addColumn("Atomic Number");
	dataset.addColumn("Atomic Weight");
	
	var periodicService = ServiceManager.getService("PeriodicTable");
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate("NET.webserviceX.www.PeriodictableLocator");
	var service = serviceLocator.getperiodictableSoap();
	
	try{
		var result = service.getAtomicNumber("sodium");
		var xml = new XML(result);
		for(var index in xml.Table){
			var element = xml.Table[index];
			dataset.addRow(new Array(element.ElementName.toString(), element.Symbol.toString(),
					element.AtomicNumber.toString(),element.AtomicWeight.toString()));
		}
	}catch(erro){
		dataset.addRow(new Array(erro));
	}
	
	return dataset;

}function onMobileSync(user) {

}