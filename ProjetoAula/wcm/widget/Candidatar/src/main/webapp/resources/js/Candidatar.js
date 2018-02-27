var HelloWorld = SuperWidget.extend({
	message: null,

	init: function () {
		//code
	},

	bindings: {
		local: {
			'enviar': ['click_enviarDados']
		}
	},

	enviarDados: function(){
		var loading = FLUIGC.loading("[id^=HelloWorld_]");
		loading.show();
		
		var nome = $("#nome").val();
		var email = $("#email").val();
		var perfil  = $("#perfil").val();
		var linkedin = $("#linkedin").val();

		var wsUrl = WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl";

		var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'
			+'   <soapenv:Header/>'
			+'   <soapenv:Body>'
			+'      <ws:create>'
			+'         <companyId>1</companyId>'
			+'         <username>galves</username>'
			+'         <password>gustavo@123</password>'
			+'         <card>'
			+'            <item>'
			+'               <cardData>'
			+'               <field>nome</field>'
			+'               <value>'+nome+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>email</field>'
			+'               <value>'+email+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>perfil</field>'
			+'               <value>'+perfil+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>linkedin</field>'
			+'               <value>'+linkedin+'</value>'
			+'               </cardData>'
			+'               <parentDocumentId>26</parentDocumentId>'
			+'   '            
			+'            </item>'
			+'         </card>'
			+'      </ws:create>'
			+'   </soapenv:Body>'
			+'</soapenv:Envelope>';

		var parser = new DOMParser();

		var xmlRequest = parser.parseFromString(soapRequest, "text/xml");
		
		WCMAPI.Create({
			url: wsUrl,
			dataType: "xml",
			contentType: "text/xml",
			data: xmlRequest,
			success: function(){
				
				
				FLUIGC.toast({
			        title: 'Operação realizada com sucesso!',
			        message: "Seu currículo foi salvo em nossa base de dados",
			        type: 'success'
			    });
			},
			error:function(){
				FLUIGC.toast({
			        title: '',
			        message: "Não foi possível completar a operação",
			        type: 'danger'
			    });
			},
			complete:function(){
				loading.hide();
			}
		})



	}
});