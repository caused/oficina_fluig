$(function(){
	var mySimpleCalendar = FLUIGC.calendar('#data');
	if($("#motivos").is(":visible") && $("#botoesAvaliar").is(":visible")){
		$("#motivos").hide();
		$(".btn").click(function(){
			$("#motivos").fadeIn();
		})
	}
	
	
	
	$("#botaoBom").click(function(){
		trocaOpcaoAcao("bom", "Enviar item");
	})
	
	$("#botaoRuim").click(function(){
		trocaOpcaoAcao("ruim", "Recusar item");
	})
	
	if($("#tabelaInformacoes").is(":visible")){
		montaTabela();
	}
	if($("#botoesRecusar").is(":visible")){
		trocaOpcoesEnvio("botaoEnviar", "enviar", "acaoRecusar");
		trocaOpcoesEnvio("botaoRecusar", "recusar", "acaoRecusar");
	}
	
	$("#botoesRecusar").on("click", ".btn", function(){
		if(!$(this).hasClass("btn-success")){
			$(".btn").toggleClass("btn-success");
		}
	})
	carregaDivAcao();
})

function limpaCombo(){
	$("#acao").empty();
}

function trocaOpcaoAcao(value, text){
	limpaCombo();
	var option = $("<option>").attr("id", "escolhaItem").attr("value", value).text(text);
	$("#acao").append(option);
	armazenaEscolhaAvaliacaoItem()
}

function trocaOpcoesEnvio(id, value, target){
	$("#"+id).click(function(){
		$("#"+target).val(value);
	})
	
}

function armazenaEscolhaAvaliacaoItem(){
	$("#armazenaOpcao").val($("#escolhaItem").val());
}

function carregaDivAcao(){
	if($("#divAcao").is(":visible")){
		var valorArmazenado = $("#armazenaOpcao").val();
		if(valorArmazenado){
			var labelSelect = "";
			if(valorArmazenado == "bom"){
				labelSelect = "Enviar item";
			}else{
				labelSelect = "Recusar item";
			}
			
			var option = $("<option>").attr("id", "escolhaItem").attr("value", valorArmazenado).text(labelSelect);
			$("#acao").append(option);
		}
		
	}
}
