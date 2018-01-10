var autoCompleteInput;

$(function (){
	$("#nomeDataset").on("input", function(){
		if(autoCompleteInput){
			console.log("entrou no if");
			autoCompleteInput.destroy();
		}
		var dataset = DatasetFactory.getDataset($(this).val(), null, null, null);
		var colunas = dataset.columns;
		console.log(colunas);
		autoCompleteInput = autoComplete(colunas, "#filtro");
		
		montarPaiFilho($(this).val(), window.parent.WCMAPI.getOrganizationId());
	})

})

function autoComplete(valor, id){
	return FLUIGC.autocomplete(id, {      
		    source:substringMatcher(valor),
		    highlight: true,
		    displayKey: 'Coluna',
		    tagClass: 'tag-gray',
		    type: 'tagAutocomplete'
	});	
}

function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
 
        matches = [];
 
        substrRegex = new RegExp(q, 'i');
 
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    Coluna: str
                 });
            }
        });
        cb(matches);
    };
 }

function removeAndCreate(id){
	
}