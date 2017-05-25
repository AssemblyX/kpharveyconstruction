var kctrl = {
    uniqueid:1,
    arrreturns:[],

    filter:function(packet, data, intreturn){
        switch(packet.type){
            case PACKET_SETCRYPT:
                ksocket.cryptKey = data.key;
                break;
            case PACKET_RETURN:
                kctrl.returnmain(data, intreturn);
                break;
            default:
                console.log("packet error");
        }
    },

    send:function(data, oreturn, config){
        var obj = {};
        obj.id = kctrl.uniqueid;
        obj.func = oreturn;
        obj.config = config;
        data.intreturn = kctrl.uniqueid;
        kctrl.arrreturns.push(obj);
        kctrl.uniqueid++;
        ksocket.send(JSON.stringify(data));
    },

    return:function(data){
    	var index = kctrl.arrreturns.findIndex(x => x.id==data.intreturn);
    	kctrl.arrreturns[index].func(data, kctrl.arrreturns[index].config);
    	kctrl.arrreturns[index] = null;
    	kctrl.arrreturns.splice(index, 1);
    },
}