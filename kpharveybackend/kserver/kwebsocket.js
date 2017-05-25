// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-websocket';

// Port where we'll run the websocket server
var webSocketsServerPort = 7001;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

/**
 * Global variables
 */
// list of currently connected clients (users)
var clients = [ ];

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    // dataaccess object
    //var database = require('./kdatabase');
    var kinterface = require('./kinterface');

    
    
    // send connection message
    connection.sendUTF(JSON.stringify( {type:"message"} ));

    
    // user sent some message
    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
            var jsonin = JSON.parse(message.utf8Data);
            var jsonout = { type:'message', intreturn: jsonin.intreturn };
            //database.gettype(clients[index], jsonout, jsonin);
            kinterface.filter({
                client:clients[index], 
                jsonout:jsonout, 
                jsonin:jsonin
            });

//             console.log(database);
//             database.interface({
//                 client:clients[index], 
//                 jsonout:jsonout, 
//                 jsonin:jsonin
//             });


//            clients[index].sendUTF(jsonout);
        }
    });

    // user disconnected
    connection.on('close', function(connection) {
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
        // remove user from the list of connected clients
        clients.splice(index, 1);
        // push back user's color to be reused by another user
    });
});
