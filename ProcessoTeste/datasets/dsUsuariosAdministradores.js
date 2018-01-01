
function createDataset(fields, constraints, sortFields) {
	
	var c1 = DatasetFactory.createConstraint("adminUser", true, true, ConstraintType.MUST);

	return DatasetFactory.getDataset("colleague", null, [c1], null);
}