$(function(){
	if($("#correcao").is(":visible")){
		$("input[name=aprovado_qualificacao]").val("sim");
		corrigirProva();
		mudarVisualBotaoAprovacao();
		
	}
	
	$("#camposAprovacao").hide();
	
	
})

function corrigirProva(){
	console.log("Entrei no corrigir prova");
	var nota = 0;
	$("input.form-check-input:checked").each(function(index, value){
		console.log("Valor do corrigor prova "+$(value));
		var input = $(value);
		if(input.val() == "correta"){
			nota++;
		}
		
	});
	
	$("#nota").text(nota);
}

function mudarVisualBotaoAprovacao(){
	$("#botoesAprovar_qualificacao").on("click", ".btn", function(){
		if(!$(this).hasClass("btn-success")){
			$(".btn").toggleClass("btn-success");
		}
		if($(this).attr("id") == "botaoAprovado"){
			$("input[name=aprovado_qualificacao]").val("sim");
		}else{
			$("input[name=aprovado_qualificacao]").val("nao");
		}
	})
}
