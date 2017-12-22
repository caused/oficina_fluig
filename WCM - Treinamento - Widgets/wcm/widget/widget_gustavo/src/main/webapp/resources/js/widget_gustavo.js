var HelloWorld = SuperWidget.extend({
    mensagem: null,

    init: function () {
        //code
    },

    bindings: {
        local: {
            'show-message': ['click_exibirMensagem']
        }
    },

    exibirMensagem: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.mensagem);
        $div.append($message);
    }
});