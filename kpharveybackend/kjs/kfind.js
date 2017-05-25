class KFind{
    static idtext(config){
        kctrl.send({config:{module:config.module, type:"idtext"}, data:{id:config.id}}, KFind.idtextreturn.bind(this), config);
    }

    static idtextreturn(json, config){
        config.el.text(json.data);
    }
}