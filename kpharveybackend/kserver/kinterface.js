"use strict";
var kuser = require('./module/kuser');


module.exports = {
    filter: function(config){
        switch(config.jsonin.config.module){
            case "user":
                kuser.filter(config);
                break;
        }
    }
}