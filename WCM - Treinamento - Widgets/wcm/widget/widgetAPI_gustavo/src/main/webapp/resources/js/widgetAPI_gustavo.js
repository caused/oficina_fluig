var MinhaAPI = SuperWidget.extend({
    message: null,

    init: function () {
    	debugger;
    	var _this = this;
    	var _Jsonret =null;
    	$.ajax({
    	  async : false,
	    	  type : "GET",
	    	  dataType : "json",
	    	  url : '/api/public/ecm/document/listDocument/0',
	    	  success : function(retorno){
	    		  _Jsonret = retorno;
	    		  
	    		  $.each(_Jsonret.content,function(k,v){

	    	    	  console.log(v.description)
	    	    	  $("#lista_diretorios_"+_this.instanceId).append("<option value="+v.id+">"+v.description+"</option>");
	    	    	  
	    	    	});
	    	  }

    	});
    },

    bindings: {
        local: {
        	'carregaDiretorio' : ['change_fnCarrega']
        }
    },

    fnCarrega:function(){
        var _this = this;
     	
     	//id do diretorio selecionado
     	var idDiretorio = $("#lista_diretorios_"+_this.instanceId).val();
     	
     	//chamar a api
     	var _Jsonret =null;
     	$.ajax({
       	  async : false,
   	    	  type : "GET",
   	    	  dataType : "json",
   	    	  url : '/api/public/ecm/document/listDocument/'+idDiretorio,
   	    	  success : function(retorno){
   	    		  _Jsonret = retorno;
   	    		  
   	    		  //Limpar o conteudo anterior antes de executar o append dentro da funcao Each
   	    		  $(".diretorios").remove();
   	    		  
   	    		  //Contar quantos objeto contem no array
   	    		  var registros = _Jsonret.content.length;
   	    		  $("#bagde_diretorios_"+_this.instanceId).text(registros);    		  
   	    		  
   	    		  $.each(_Jsonret.content,function(k,v){
   	    	    	  console.log(v.description)
   	    	    	  $("#relacionar_diretorios_"+_this.instanceId).append('<li class="list-group-item diretorios">'+v.description+'</li>');
   	    	    	  
   	    	    	});
   	    	  }

       	});
     }
});