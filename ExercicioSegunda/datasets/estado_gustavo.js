function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	//cria as colunas
	dataset.addColumn("Sigla");
	dataset.addColumn("Estado");
	dataset.addColumn("Capital");
	
	//cria os registros
	dataset.addRow(new Array("AC", "Acre", "Rio Branco"));
	dataset.addRow(new Array("AL", "Alagoas", "Maceió"));
	dataset.addRow(new Array("AP", "Amapá", "Macapá"));
	dataset.addRow(new Array("AM", "Amazonas", "Manaus"));
	dataset.addRow(new Array("BA", "Bahia", "Salvador"));
	dataset.addRow(new Array("CE", "Ceará", "Fortaleza"));
	dataset.addRow(new Array("DF", "Distrito Federal", "Brasília"));
	dataset.addRow(new Array("ES", "Espírito Santo", "Vitória"));
	dataset.addRow(new Array("GO", "Goiás", "Goiânia"));
	dataset.addRow(new Array("MA", "Maranhão", "São Luís"));
	dataset.addRow(new Array("MT", "Mato Grosso", "Cuiabá"));
	dataset.addRow(new Array("MS", "Mato Grosso do Sul", "Campo Grande"));
	dataset.addRow(new Array("MG", "Minas Gerais", "Belo Horizonte"));
	dataset.addRow(new Array("PA", "Pará", "Belém"));
	dataset.addRow(new Array("PB", "Paraíba", "João Pessoa"));
	dataset.addRow(new Array("PR", "Paraná", "Curitiba"));
	dataset.addRow(new Array("PE", "Pernambuco", "Recife"));
	dataset.addRow(new Array("PI", "Piauí", "Teresina"));
	dataset.addRow(new Array("RJ", "Rio de Janeiro", "Rio de Janeiro"));
	dataset.addRow(new Array("RN", "Rio Grande do Norte", "Natal"));
	dataset.addRow(new Array("RS", "Rio Grande do Sul", "Porto Alegre"));
	dataset.addRow(new Array("RO", "Rondônia", "Porto Velho"));
	dataset.addRow(new Array("RR", "Roraima", "Boa Vista"));
	dataset.addRow(new Array("SC", "Santa Catarina", "Florianópolis"));
	dataset.addRow(new Array("SP", "São Paulo", "São Paulo"));
	dataset.addRow(new Array("SE", "Sergipe", "Aracaju"));
	dataset.addRow(new Array("TO", "Tocantins", "Palmas"));
	
	return dataset
	
}

function onMobileSync(user) {

}