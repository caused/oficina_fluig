$(function(){
	$("#servidor").val(window.parent.WCMAPI.getServerURL())
	$("#receberEmail").on("change", function(){
		var resposta = $(this).val();
		
		if(resposta == "Sim"){
			$("#divDestinatario").fadeIn();
		}else{
			$("#divDestinatario").fadeOut();
		}
	})
})