"use strict";
var kuser = require('./module/kuser');
var kclient = require('./module/kclient');


module.exports = {
    filter: function(config){
        switch(config.jsonin.config.module){
            case "user":
                return kuser.filter(config);
                break;
            case "client":
                kclient.filter(config);
                break;
        }
    }
}