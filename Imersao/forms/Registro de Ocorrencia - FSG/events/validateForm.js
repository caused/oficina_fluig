function validateForm(form){
	var errorMsg = "";
	var numAtiv = getValue("WKNumState").toString();
	var lineBreaker = "\n";
	var INICIO_SOLICITACAO = "0", 
	ATIVIDADE_INICIO = "1",
	REGISTRAR_PLANO = "5",
	VERIFICAR_EFICACIA = "9",
	EXECUTAR_PLANO = "25";

	
	if(numAtiv == INICIO_SOLICITACAO || numAtiv == ATIVIDADE_INICIO){
		 if(form.getValue("nmTipoAcao") == null || form.getValue("nmTipoAcao").trim().isEmpty()){
         	errorMsg += "-O campo 'Tipo de ação' é obrigatório!"+lineBreaker;
         }
		 if(form.getValue("nmUnidade") == null || form.getValue("nmUnidade").trim().isEmpty()){
         	errorMsg += "-O campo 'Unidade' é obrigatório!"+lineBreaker;
         }
		 if(form.getValue("nmAreaZoom") == null || form.getValue("nmAreaZoom").trim().isEmpty()){
         	errorMsg += "-O campo 'Área' é obrigatório!"+lineBreaker;
         }
		 if(form.getValue("nmOrigemZoom") == null || form.getValue("nmOrigemZoom").trim().isEmpty()){
         	errorMsg += "-O campo 'Origem' é obrigatório!"+lineBreaker;
         }
		 if(form.getValue("nmCriticidadeZoom") == null || form.getValue("nmCriticidadeZoom").trim().isEmpty()){
         	errorMsg += "-O campo 'Criticidade' é obrigatório!"+lineBreaker;
         }
         
         if(form.getValue("dsOcorrencia") == null || form.getValue("dsOcorrencia").trim().isEmpty()){
          	errorMsg += "-O campo 'Ocorrência' é obrigatório!"+lineBreaker;
          }
		 
		 if(form.getValue("fgContencao") == "on" && (form.getValue("dsContencao") == null || form.getValue("dsContencao").trim().isEmpty())){
         	errorMsg += "-O campo 'Descrição da Contenção' é obrigatório!"+lineBreaker;
         }
		 if(form.getValue("fgOcorrenciaReincidente") == "Sim" && (form.getValue("cdOcorrenciaReincidenteZoom") == null || form.getValue("cdOcorrenciaReincidenteZoom").trim().isEmpty())){
         	errorMsg += "-O campo 'Nº da Não Conformidade Reincidente' é obrigatório!"+lineBreaker;
         }
	}else if(numAtiv == REGISTRAR_PLANO){
		/* VALIDA PAI X FILHO */
		
		if(form.getValue("dsAnaliseCausa") == null || form.getValue("dsAnaliseCausa").trim().isEmpty()){
	         	errorMsg += "-O campo 'Causa' é obrigatório!"+lineBreaker;
	         }
		
		    var indexes = form.getChildrenIndexes("ativPlano");
		    if(indexes.length == 0){
		    	errorMsg += "-O Plano de Ação é de preenchimento obrigatório!"+lineBreaker;
		    }else{
		        for (var i = 0; i < indexes.length; i++) {
		        	if(form.getValue("w1___" + indexes[i]) == null || form.getValue("w1___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "O campo O Que Fazer é obrigatório!"+lineBreaker;
		            }
		        	if(form.getValue("w2___" + indexes[i]) == null || form.getValue("w2___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "-É obrigatório selecionar um responsável pelo Plano de Ação!"+lineBreaker;
		            }
		            if(form.getValue("w3___" + indexes[i]) == null || form.getValue("w3___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "O campo Quando Será Feito é obrigatório!"+lineBreaker;
		            }
		            if(form.getValue("w4___" + indexes[i]) == null || form.getValue("w4___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "O campo Onde Será Feito é obrigatório!"+lineBreaker;
		            }
		            if(form.getValue("w5___" + indexes[i]) == null || form.getValue("w5___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "O campo Por Que Será Feito é obrigatório!"+lineBreaker;
		            }
		            if(form.getValue("h1___" + indexes[i]) == null || form.getValue("h1___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "O campo Como Será Feito é obrigatório!"+lineBreaker;
		            }
		            if(form.getValue("h2___" + indexes[i]) == null || form.getValue("h2___" + indexes[i]).trim().isEmpty()){
		            	errorMsg += "O campo QUANTO R$ é obrigatório!"+lineBreaker;
		            }
		        		
		            
		        }
		    }
	}else if(numAtiv == EXECUTAR_PLANO){
		debugger;
		var indexes = form.getChildrenIndexes("ativPlano");
		var responsaveis = form.getValue("responsaveis").split(";");
        for (var i = 0; i < indexes.length; i++) {
        	if(responsaveis[i] == getValue("WKUser") && (form.getValue("situacao___" + indexes[i]) == null || form.getValue("situacao___" + indexes[i]).trim().isEmpty())){
        		errorMsg += "-É obrigatório preencher o campo situação em todas as linhas do Plano de Ação!"+lineBreaker;
        		break;
        	}
        }
	}else if(numAtiv == VERIFICAR_EFICACIA){
		var indexes = form.getChildrenIndexes("ativPlano");
        for (var i = 0; i < indexes.length; i++) {
        	if(form.getValue("eficaz___" + indexes[i]) != "Sim" && form.getValue("eficaz___" + indexes[i]) != "Nao"){
        		errorMsg += "-É obrigatório aprovar/reprovar todas as atividades do Plano de Ação!"+lineBreaker;
        		break;
        	}
        }
        for (var j = 0; j < indexes.length; j++) {
        	if(form.getValue("eficaz___" + indexes[j]) == "Nao" && (form.getValue("dsEficacia___" + indexes[j]) == null || form.getValue("dsEficacia___" + indexes[j]).trim().isEmpty())){
        		errorMsg += "-É obrigatório preencher o campo 'Observações' para todas as atividades do Plano de Ação reprovadas!"+lineBreaker;
        		break;
        	}
        }
	}
	if(errorMsg != ""){
		throw "Erro ao movimentar processo\n"+errorMsg; 
	}
	
}