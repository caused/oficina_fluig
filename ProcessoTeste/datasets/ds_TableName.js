function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	if(fields == null){
		dataset.addColumn("INFO");
		dataset.addRow(["Informe os parãmetros para consulta"]);
		return dataset;
	}
	
	var nomeDataset = fields[0];
	var empresa = fields[1];
	
	log.info("Nome do dataset: "+nomeDataset);
	log.info("Nome de empresa: "+empresa);
	
	var query = "SELECT distinct cod_tabela FROM META_LISTA_REL as mt inner join documento d"
		+" on d.COD_LISTA = mt.cod_lista_pai  "
		+" WHERE d.NM_DATASET IN ('"+nomeDataset+"') AND d.VERSAO_ATIVA = 1 and d.COD_EMPRESA = '"+empresa+"';";
	
	var resultado =  DatasetFactory.getDataset("ds_consulta_sql", [query], null, null);
	dataset.addColumn("tablename");
	log.info("Linhas retornadas da consulta de tablenames: "+resultado.rowsCount);
	for(var i = 0; i < resultado.rowsCount; i++){
		log.info("Resultado: "+resultado.getValue(i, "cod_tabela"));
		dataset.addRow(new Array(resultado.getValue(i, "cod_tabela")));
	}
	
	return dataset;

}function onMobileSync(user) {

}