var divAprovacaoColaborador = $("#painel_aprovar_colaborador");

$(function(){
	FLUIGC.calendar('#dataColaborador');
	
	if(!divAprovacaoColaborador.is(":visible")){
		$("#divVagaColaborador").hide();
		$("#divUnidadeColaborador").hide();
		$("#divGestorColaborador").hide();
		
		$("input[type=button]").each(function(value){
			if($(value).val() == "Adicionar"){
				$(value).hide();
			}
		})
	}else{
		$("#divVagaColaboradorZoom").hide();
		$("#divUnidadeColaboradorZoom").hide();
		$("#divGestorColaboradorZoom").hide();
	}
	
	mudarVisualBotaoAprovacao();
	
})

function mudarVisualBotaoAprovacao(){
	$(".btn").on("click", function(){
		if(!$(this).hasClass("btn-success")){
			$(".btn").toggleClass("btn-success");
		}
		var identificador = $(this).attr("id");
		
		if(identificador == "botaoAprovado"){
			$("#aprovado_qualificacao").val("sim");
		}else{
			$("#aprovado_qualificacao").val("não");
		}
	})
}
