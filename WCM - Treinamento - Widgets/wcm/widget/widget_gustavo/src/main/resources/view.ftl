<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="HelloWorld.instance({mensagem: 'Bizon e Sandro vão chorar após ver o resultado de hoje'})">

    <!-- efetua a tradução do texto do objeto i18n -->	
    <h1>${i18n.getTranslation('hello.example.hello')}</h1>
    <h1>${i18n.getTranslation('hello.example.firstTitle')}</h1>
    <h2>${i18n.getTranslation('hello.example.secondTitle')}</h2>
    <h3>${i18n.getTranslation('hello.example.thirdTitle')}</h3>

    <div>
        <button type="button" class="btn btn-default" data-show-message>${i18n.getTranslation('hello.button.showMessage')}</button>
    </div>

    <div id='helloMessage_${instanceId}'>
    </div>
    

</div>
