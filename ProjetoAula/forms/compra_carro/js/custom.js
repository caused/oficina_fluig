$(function(){
	FLUIGC.calendar("#dataNascimento");
	FLUIGC.switcher.init("#botaoStatus")
	if(currentState == 0){
		$("#aprovacao").hide();
	}
})