var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
    },

    bindings: {
        local: {
            'tipo_graph': ['change_fnGrafico']
        }
    },

   fnGrafico: function(){
	   //exemplo de array com valores fixos
    	var array_fixo = [65, 59, 80, 81, 56, 55, 40];
    	
    	//consulta um dataset customizado
    	var ds = DatasetFactory.getDataset("dsProdutos_gustavo", null, null, null);
    	//criar um array vazio para receber os dados do dataset
    	var array_vazio = [];

    	for(x = 0; x < ds.values.length ; x++){
    		array_vazio[x] = ds.values[x].Valor
    	}
    	//verifica o valor do setado no combo
    	var tipoCombo = $("#cmbTipo").val();
    	
    	if(tipoCombo == "bar"){
    		$("#lineType").hide();
    		
    		$("#barType").show();
    		
    		//definicao dos dados utilizados para gerar o gráfico
    		var data = {
    				labels: ["Xbox One", "Playstation 4", "Geladeira", "Armário", "Hack, Notebook"],
    				//valores e formatações
    				datasets:[
    				          {
    				        	  fillColor: "rgba(220,220,220,0.2)",
    				        	  strokeColor:"rgba(220, 220, 220, 1)",
    				        	  pointColor: "rgba(220,220,220,1)",
    				        	  pointStrokeColor:"#fff",
    				        	  pointHighlightFill:"#fff",
    				        	  pointHighlightStroke:"rgba(220,220,220,1)",
    				        	  data: array_vazio
    				          },
    				          {
    				        	  fillColor: "rgba(151, 187, 205, 0.2)",
    				        	  strokeColor: "rgba(151, 187, 205, 1)",
    				        	  pointColor: "rgba(151, 187, 205, 1)",
    				        	  pointStrokeColor: "#fff",
    				        	  pointHighlightFill: "#fff",
    				        	  pointHighlightStroke: "rgba(151, 187, 205, 1)",
    				        	  //passando um array fixo como valor de fonte para o gráfico
    				        	  data: [280, 480, 940, 1900, 860, 727, 690]
    				          }
    				        ]
    		};
    		
    		//criação do gráfico
    		var chart = FLUIGC.chart("#barType", {
    			id: "barNew",
    			width: "700",
    			height: "200"
    		});
    		
    	
    		// definição do dados utilizados e o tipo do gráfico
    		var barChart = chart.bar(data, "");
    	}
    	
    	if(tipoCombo == "line"){
    		$("#barType").hide();
    		$("#lineType").show();
    		
    		var data = {
    				labels: ["Xbox One", "Playstation 4", "Geladeira", "Armário", "Hack, Notebook"],
    				//valores e formatações
    				datasets:[
    				          {
    				        	  fillColor: "rgba(220,220,220,0.2)",
    				        	  strokeColor:"rgba(220, 220, 220, 1)",
    				        	  pointColor: "rgba(220,220,220,1)",
    				        	  pointStrokeColor:"#fff",
    				        	  pointHighlightFill:"#fff",
    				        	  pointHighlightStroke:"rgba(220,220,220,1)",
    				        	  data: array_vazio
    				          },
    				          {
    				        	  fillColor: "rgba(151, 187, 205, 0.2)",
    				        	  strokeColor: "rgba(151, 187, 205, 1)",
    				        	  pointColor: "rgba(151, 187, 205, 1)",
    				        	  pointStrokeColor: "#fff",
    				        	  pointHighlightFill: "#fff",
    				        	  pointHighlightStroke: "rgba(151, 187, 205, 1)",
    				        	  //passando um array fixo como valor de fonte para o gráfico
    				        	  data: [280, 480, 940, 1900, 860, 727, 690]
    				          }
    				          ]
    		}
    		
    		//criação do gráfico
    		var chart = FLUIGC.chart("#lineType", {
    			id: "lineNew",
    			width: "700",
    			height: "200"
    		});
    		
    	
    		// definição do dados utilizados e o tipo do gráfico
    		var lineChart = chart.line(data, "");
    		
    	}
   }
});