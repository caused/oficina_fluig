//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()

function disableField($el, disabled){
	if(disabled){
		$("#" + $el.attr('id') + "_d").hide();
		$el.show();
	}
	else{
		if($("#" + $el.attr("id") + "_d").length > 0){
			$("#" + $el.attr("id") + "_d").show() 
		}else{
			$el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":($el.attr("name") + "_d")}).attr("disabled",true));
		}
//		($("#" + $el.attr("id") + "_d").length > 0) ? $("#" + $el.attr("id") + "_d").show() : $el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":($el.attr("name") + "_d")}).attr("disabled",true));
		$el.hide();
	}
}

function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],img").each(function (i) {
		enableField($(this), enabled);
	});
};

function enableField($el, enabled){
	if($el.attr("type") == "text"){
		$el.prop("readonly",!enabled);
		//se possui botao agrupado desabilita tambem
		if(enabled == false){
			$el.css("pointer-events", "none");
			$el.parent().find('.input-group-addon').css("pointer-events", "none");
			$el.parent().find('.input-group-addon').children().css("opacity", 0.4);
		}
		else{
			$el.css("pointer-events", "auto");
			$el.parent().find('.input-group-addon').css("pointer-events", "auto");
			$el.parent().find('.input-group-addon').children().css("opacity", 1);
		}
	}
	else if($el.prop("tagName") == "TEXTAREA"){
		$el.prop("readonly",!enabled);;
	}
	else if($el.prop("tagName") == "SELECT"){
		disableField($el, enabled);
	}
	else if($el.attr("type") == "button" || $el.prop("tagName") == "IMG"){
		$el.prop("disabled",!enabled);
		if(enabled){
			$el.css("opacity", 1);
			$el.css("filter", "");
			if($el.data("click-event") != ""){
				$el.on("click", $el.data("click-event"));
				$el.data("click-event", "");
			}
		} else {
			$el.css("opacity", 0.4);
			$el.css("filter", "alpha(opacity=40)");
			$el.data("click-event", $el.get(0).onclick);
			$el.off();
			$el.get(0).onclick = "";
		}
	}
	else if($el.attr("type") == "radio" || $el.attr("type") == "checkbox" || $el.attr("type") == undefined){
		var endWithDisabled = new RegExp(/_d$/);
		var nameOf = ($el.selector.replace("#","") != "") ? $el.selector.replace("#","") : $el.attr("name");

		$el = $("[name='" + nameOf + "']").filter(function(index, element) {
			return !endWithDisabled.test(element.id);		});

		if($el.length && $el.length > 0 && ($el.attr("type") == "radio" || $el.attr("type") == "checkbox")){
			$el.each(function(i){
				$("label[for^='"+$(this).prop("id")+"']").each(function (i) {
					var suffix = (endWithDisabled.test($(this).prop("for"))) ? "_d" : "";
					if(enabled){
						$(this).prop("for", $(this).prop("for").replace(endWithDisabled,""));
					}
					else if(suffix == ""){
						$(this).prop("for", $(this).prop("for")+"_d");
					}
				});
				disableField($(this), enabled);
			});
		}
	}
}
function applyDisabledStyle(){
	var arr = $("input");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("textarea");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("select");
	$.each(arr,function(index, item){
		$(item).change();
	});	

	var imgs = document.getElementById(tableId).getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		imgs[i].style.display = "none";
	}
}

function enableFields(){
	var activity = getWKNumState();
	
	if(activity == INICIO_SOLICITACAO || activity == ATIVIDADE_INICIO){
		enableContainer($("#divAnaliseCausa"), false);
	}else if(activity == REGISTRAR_PLANO){
		enableContainer($("#divDetalhes"), false);
		enableContainer($("#divOcorrencia"), false);
		enableContainer($("#divContencao"), false);
		
		if($("[name^=eficaz___]:checked").length>0){
			enableContainer($("#divAnaliseCausa"), false);
			$("#ativPlano tbody tr:gt(0)").each(function(){
				if($(this).find("[name^=eficaz___]:checked").length > 0){
//					enableContainer($(this), false)
					$(this).find("[name^=eficaz___]").each(function(){
						var _this = $(this); 
						$(this).parent().append(_this.clone().attr({"id":("_"+_this.attr("id")),"name":("_"+_this.attr("name") ),"disabled":"disabled"}).show())
						
						$(_this).hide();
					});
					
					$(this).find("[name^=dsEficacia___]").each(function(){
						enableField($(this), false);
					});
					
				}
			})
			
		}
		
		
	}else if(activity == EXECUTAR_PLANO){	
		enableContainer($("#divDetalhes"), false);
		enableContainer($("#divOcorrencia"), false);
		enableContainer($("#divContencao"), false);
		enableContainer($("#divAnaliseCausa"), false);
		
		enableContainer($("#divPlanoAcao"), false);
		$("[name^=eficaz___]").each(function(){
			disableRadio($(this));
		})
		
		
		$("[name^=situacao___]").each(function(){
			enableField($(this), true);
		})
		
	}else if(activity == VERIFICAR_EFICACIA){
		enableContainer($("#divDetalhes"), false);
		enableContainer($("#divOcorrencia"), false);
		enableContainer($("#divContencao"), false);
		enableContainer($("#divAnaliseCausa"), false);
		enableContainer($("#divPlanoAcao"), false);
		
		$("[name^=dsEficacia___],[name^=eficaz___]").each(function(){
			enableField($(this), true);
		})
	}else if(activity == NOTIFICAR ){
		enableContainer($(".fluig-style-guide"), false);
		
		$("#ativPlano tbody tr:gt(0)").each(function(){
			$(this).find("input[type=radio]").each(function(){
				disableRadio($(this));
			})
		})
		
	}else if(activity == FIM){
		enableContainer($(".fluig-style-guide"), false);
		
		$("#ativPlano tbody tr:gt(0)").each(function(){
			$(this).find("input[type=radio]").each(function(){
				disableRadio($(this));
			})
		})
	}
}