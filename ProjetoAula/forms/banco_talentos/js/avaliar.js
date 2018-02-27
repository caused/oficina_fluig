$("#avaliarCandidato").click(function(){
	
	var _xml;
	
	$.ajax({
		async:false,
		url: "xml/ECMWorkflowEngineService.xml",
		method:"GET",
		dataType: "xml",
		success:function(ret){
			_xml = $(ret);
		}
	})
	
	_xml.find("[name=nome]").text($("#nome").text());
	_xml.find("[name=perfil]").text($("#perfil").text());
	_xml.find("[name=email]").text($("#email").text());
	_xml.find("[name=linkedin]").text($("#linkedin").text());
	
	parent.WCMAPI.Create({
		url: "/webdesk/ECMWorkflowEngineService?wsdl",
		contentType: "text/xml",
		dataType:"xml",
		data: _xml[0],
		success: function(){
			FLUIGC.toast({
		        title: 'Operação realizada com sucesso!',
		        message: "O processo de avaliação foi iniciado",
		        type: 'success'
		    });
		}
	})
	
	
})
