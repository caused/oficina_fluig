function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dsAdministradores = DatasetBuilder.newDataset();
	
	dsAdministradores.addColumn("Nome usuário");
	dsAdministradores.addColumn("Email usuário");
	dsAdministradores.addColumn("Login");
	
	var c1 = DatasetFactory.createConstraint("adminUser", false, false, ConstraintType.MUST);
	c1.setLikeSearch(true);
	
	var constraints = new Array(c1);
	
	var dsUsuarios = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	var resultSet = dsUsuarios.toResultSet();
	
	while(resultSet.next()){
		var colleagueName = resultSet.getString("colleagueName");
		var mail = resultSet.getString("mail");
		var login = resultSet.getString("login");
		
		dsAdministradores.addRow(new Array(colleagueName, mail, login));
	}
	
	return dsAdministradores;
}

function onMobileSync(user) {

}