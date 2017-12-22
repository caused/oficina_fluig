var responsaveis = "";
var arrayResponsaveis = new Array();
var index ="";
var INICIO_SOLICITACAO = "0", 
ATIVIDADE_INICIO = "1",
REGISTRAR_PLANO = "5",
VERIFICAR_EFICACIA = "9",
EXECUTAR_PLANO = "25";
NOTIFICAR = "10";
FIM = "11";

$( document ).ready(function() {
	init();
	
	
});

function init(){
	
	
	requiredFields();
	buildTab();
	enableFields();
	showComponents();
	

	if(getFormMode() != "ADD" && getFormMode()!= "MOD" ) {
//		enableContainer($(".fluig-style-guide"), false);
		$("input,textarea").attr("readonly","readonly");
		disableButtons();
		$("#btIncluir").hide();
		showDeleteButton(false);

		$("#ativPlano tbody tr:gt(0)").each(function(){
			$(this).find("input[type=radio]").each(function(){
				disableRadio($(this));
			})
		})
		
//		$("[name^=eficaz___]").each(function(){
//		})

	}
}

function showComponents(){
	var activity = getWKNumState();
	
	enabledFieldCdOccurrenceRecidivist();
	enableFieldContention();
	showEfficiency();
	showMonitoring();
	showLinhaPlanoAcao();
	showDeleteButton(activity == REGISTRAR_PLANO);
	
	
	if (activity == REGISTRAR_PLANO) {
		$("#btIncluir").show();
	}else{
		$("#btIncluir").hide();
	}
	
	if(activity == INICIO_SOLICITACAO || activity == ATIVIDADE_INICIO){
		$("#divPlanoAcao").show();
		$("#divAnaliseCausa").show();
	}else if(activity == REGISTRAR_PLANO){
		$("#divPlanoAcao").show();
		$("#divAnaliseCausa").show();
		$("#dsContencao").attr("readonly", true);
//		disableButtons("divDetalhes");
		
		$("#ativPlano tbody tr:gt(0)").each(function(){
			if($(this).find("[name^=eficaz___]:checked").length > 0){
				$(this).find(".fluigicon-trash").hide()
			}
		})
		
	}else if(activity == EXECUTAR_PLANO){
		$("#divPlanoAcao").show();
		$("#divAnaliseCausa").show();
		esconderCamposResponsaveis()
//		disableButtons("divDetalhes");
	}else if(activity == VERIFICAR_EFICACIA){
		$("#divPlanoAcao").show();
		$("#divAnaliseCausa").show();
	}else if(activity == NOTIFICAR){
		$("#divPlanoAcao").show();
		$("#divAnaliseCausa").show();
		esconderCamposResponsaveis()
	}else if(activity == FIM){
		$("#divPlanoAcao").show();
		$("#divAnaliseCausa").show();
	}
	
}

function showDeleteButton(show){
	
	if(show){
		$("[id^='btnDelete'").show();
	}else{
		$("[id^='btnDelete'").hide();
	}
	
}

function disableButtons(parent){
	var elements;
	if(parent == undefined){
		elements = document.getElementsByTagName("span");
	}else{
		var parentObj = document.getElementById(parent);
		elements = parentObj.getElementsByTagName("span");
	}
	
	for (var i = 0; i < elements.length; i++) {
		if(elements[i].className.indexOf("btnForm") > -1){
			elements[i].classList.remove("fs-cursor-pointer");
			elements[i].onclick = function() {
			     return false;
			   }
		}
	}
//	$(".btnForm").each(function(){
//		$(this).bind("click", function(){
//			return false;
//		})
//	});
}
function showLinhaPlanoAcao(){
	var activity = getWKNumState();
	if(activity == EXECUTAR_PLANO){
		$('#ativPlano tbody tr td input[class="cdResponsavel"]').each(function(){
			if(getCurrentUser() == $(this).val()){
				$(this).closest('tr').show();
			}else{
				$(this).closest('tr').hide();
			}
		});
	}
}

function removeButtonEvent(parent){
	$(parent).find(".input-group-addon").unbind()
	
}

function showMonitoring(){
	var activity = getWKNumState();
	if(activity == ATIVIDADE_INICIO || activity == INICIO_SOLICITACAO || activity == REGISTRAR_PLANO){
		$(".acompanhamento").hide();
	}else{
		// Se Não foi Eficaz Irá mostrar
		if($("[name^=eficaz___]:checked").length==0){
			$(".acompanhamento").show();
		}
	}
	
}

function showEfficiency(){
	var activity = getWKNumState();
	if(activity == VERIFICAR_EFICACIA || activity == NOTIFICAR || activity == FIM ){
		$(".eficacia").show();
		if(getFormMode() == "ADD" && getFormMode()== "MOD" ) {
			$("[name^=eficaz___]").each( function(){
				var _this = $(this); 
				$(this).parent().append(_this.clone().attr({"id":("_"+_this.attr("id")),"name":("_"+_this.attr("name") ),"disabled":"disabled"}).show()) 
			})
		}
	}else{
		if($("[name^=eficaz___]:checked").length==0){
			$(".eficacia").hide();
		}
	}
}

function disableRadio(el){
	if($(el).parent().find("#_"+$(el).prop("id")).length == 0){
		var _this = $(el); 
		$(el).parent().append(_this.clone().attr({"id":("_"+_this.attr("id")),"name":("_"+_this.attr("name") ),"disabled":"disabled"}).show())
		$(_this).hide();
	}
}

function addFilho(){
	var index = wdkAddChild('ativPlano');
	$('#w3___'+index).mask('00/00/0000');
	$('#h2___'+index).mask("###.###.##0,00", {reverse: true});
	
	enableField($("#dsEficacia___"+index), false);
	disableRadio($("[name=eficaz___"+index+"][value=Nao]"));
	disableRadio($("[name=eficaz___"+index+"][value=Sim]"));
	
//	enableField($("[name=eficaz___"+index+"][value=Nao]"), false);
//	enableField($("[name=eficaz___"+index+"][value=Sim]"), false);	showEfficiency();
	showMonitoring();
	
}

function fnCustomDelete(botao){
	var index = botao.id.split("___")[1];
	if(getCurrentUser() == $("#w2___"+index).val()){
		FLUIGC.toast({
            message: "Não é possivel excluir uma linha do plano de ação na qual você é responsavel!.",
            type: 'danger'
        });
	}else{
		removeResponsaveis(arrayResponsaveis[index-1]);
		fnWdkRemoveChild(botao);
		
	}
	
}

function removeResponsaveis(matricula){
	var array = responsaveis.split(";");
	var arrayNovo = new Array();
	for(i = 0; i < array.length; i++){
		if(array[i] != matricula){
			arrayNovo.push(array[i]);
		}
	}
	
	responsaveis = arrayNovo.join(";");
	$("#responsaveis").val(responsaveis);
}

/*function incluiResponsavel(matricula){
	debugger;
	var hashResponsaveis = {};
	$("input[name^='w2___']").each(function(){
		if(hashResponsaveis[$(this).val()] == undefined){
			hashResponsaveis[$(this).val()] = $(this).val();
		}
	})
	
	if(matricula != null && matricula != undefined && hashResponsaveis[matricula] == undefined){
			hashResponsaveis[matricula] = matricula;
	}
	var responsaveis = "";
	for ( var index in hashResponsaveis) {
		if(responsaveis != ""){
			responsaveis = responsaveis+";";
		}
		responsaveis = responsaveis+hashResponsaveis[index];
	}

	$("#responsaveis").val(responsaveis);
}	*/

function clearField(field){
	document.getElementById(field).value='';
}
function enableFieldContention(){
	var activity = getWKNumState();
	$("#divContencao").show();
	if(activity == INICIO_SOLICITACAO || activity == ATIVIDADE_INICIO){
		if($("#fgContencao:checked").val() != undefined){
			$("#dsContencao").removeAttr("readonly");
		}else{
			$("#dsContencao").attr("readonly","readonly");
//			$("#divContencao").hide();
			$("#dsContencao").val("");
		}
	}else{
		$("#dsContencao").removeAttr("readonly");
	}
		
}



function enabledFieldCdOccurrenceRecidivist(){
	var selectedValue = $("input[name='fgOcorrenciaReincidente']:checked").val();
	if (selectedValue == "Sim") {
		$("#divReincidente").show()
	}
	else {
		$("#divReincidente").hide()
	}
}



function buildTab() {
	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).show(); //Fade in the active ID content
		return false;
	});
}


function requiredFields(){
	var currentState = getWKNumState();
	var mandatoryFields = new Fields();
	var fields = [];

	//Inicio da parte editavel
	mandatoryFields.addField("nmTipoAcao",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("nmUnidade",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("nmArea",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("nmOrigem",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("nmCriticidade",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("fgOcorrenciaReincidente",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("dsOcorrencia",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("dsContencao",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	mandatoryFields.addField("cdOcorrenciaReincidente",[INICIO_SOLICITACAO, ATIVIDADE_INICIO]);
	
	mandatoryFields.addField("dsAnaliseCausa",[REGISTRAR_PLANO]);
	
	
	
	
	
	
	
	//Fim da parte editavel
	
	fields = mandatoryFields.getFields();
	
	for(var i=0; i<fields.length; i++){
		if(fields[i].activities.indexOf(currentState) >= 0) setRequired(fields[i].id);
	} 
} 


function setRequired(name){
	var $element = $('input[name="'+name+'"], textarea[name="'+name+'"], select[name="'+name+'"], checkbox[name="'+name+'"]');
	var $label;
	
	if($element.attr('type') == "radio") $label = $($element.parent()[0]).parent().prev();
	else $label = ($element.prev().length == 0) ? $element.parent().prev() : $element.prev();
	
	$label.addClass('required');	
}

function Fields(){
	this.fields = [];
	
	this.addField = function(id, arrayActivities){
		this.fields.push({"id":id,"activities":arrayActivities});
	}
	
	this.getFields = function(){
		return this.fields;
	}
}

function setSelectedZoomItem(selectedItem) {  
	if(selectedItem.inputId.startsWith("w2")){
		if(responsaveis == ""){
			responsaveis = selectedItem.colleagueId+";";
		}else if(responsaveis.endsWith(";")){
			responsaveis += selectedItem.colleagueId;
		}else{
			responsaveis += ";"+selectedItem.colleagueId;
		}
		arrayResponsaveis.push(selectedItem.colleagueId);
	}
	$("#responsaveis").val(responsaveis);
}

function removedZoomItem(removedItem) {
	if(removedItem.inputId.startsWith("w2")){
		removeResponsaveis(removedItem.colleagueId);
	}
}

function esconderCamposResponsaveis(){
	var user = getCurrentUser();
	arrayResponsaveis = $("#responsaveis").val().split(";");
	for(var i =0; i < arrayResponsaveis.length; i++){
		if(arrayResponsaveis[i] != user){
			$("#w2___"+(i+1)).closest("tr").hide()
		}
	}
	
}