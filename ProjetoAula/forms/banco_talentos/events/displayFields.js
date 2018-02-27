function displayFields(form,customHTML){

	var usuario = getValue("WKUser");
	var nome = form.getValue("nome");
	var email = form.getValue("email");
	var perfil = form.getValue("perfil");
	var linkedin = form.getValue("linkedin");
	
	
	var interacao = "<h1>Olá <strong>"+usuario+"</strong>. O "+nome+" deseja trabalhar conosco!</h1><br/>"+
	"<h3>O seu perfil é "+perfil+" e você pode conferir seu curriculo completo no Linkedin: "+linkedin+""+ "."+
	"<br/>Você também pode entrar em contato pelo e-mail:" +email+ "."+
	"<br/>Obrigado</h3>"
	
	customHTML.append("<script>$('#mensagemInteracao').show();$('#formPrincipal').hide();</script>")
	customHTML.append("<script>$('#mensagemInteracao').append('"+interacao+"');</script>")
}