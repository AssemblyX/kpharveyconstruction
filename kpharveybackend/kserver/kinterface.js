"use strict";
var kuser = require('./module/kuser');
var kclient = require('./module/kclient');


module.exports = {
    filter: function(config){
        switch(config.jsonin.config.module){
            case "user":
                kuser.filter(config);
                break;
        }

        switch(config.jsonin.config.module){
            case "client":
                kclient.filter(config);
                break;
        }
    }
}