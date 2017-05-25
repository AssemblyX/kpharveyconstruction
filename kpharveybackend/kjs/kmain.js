var ksocket = null;
$( function() {
    "use strict";
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
        console.log("websocket error");
        return;
    }
    
    try {
        //ksocket = new WebSocket('ws://159.203.57.230:7001');
        ksocket = new WebSocket('ws://localhost:7001');
    } catch (e){
        console.log('This doesn\'t look like a valid JSON: ', e);
        return;
    }
    

    ksocket.onopen = function () {
        // start application
        new KScreen();
        new KMsg("Socket ksocket Established");
    };

    ksocket.onerror = function (error) {
        // just in there were some problems with conenction...
        console.log(error);
    };

    // most important part - incoming messages
    ksocket.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        if(json.intreturn)
            kctrl.return(json);
    };


    //new CostAnnalysis();
});

