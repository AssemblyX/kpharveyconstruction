/***
Server admin user

***/
"use strict";
var $db = require('./../kdatabase');

module.exports = {
    filter: function(config){
        switch(config.jsonin.config.type){
            case "insert":
                userinsert(config);
                break;
            case "list":
                userlist(config);
                break;
        }
    }
}

function userinsert(config){
    var data = config.jsonin.data.insert;
    var idxlogin = data.findIndex(x => x.name=="login");
    var idxemail = data.findIndex(x => x.name=="email");
    var sql = "SELECT user_login, user_email FROM tbl_user where user_login = '" + data[idxlogin].value + "' OR user_email = '" + data[idxemail].value + "'";
    $db.conn().query(sql, function(err, result, fields) 
    {
        if(err) throw err;
        if(result.length == 0){
            config.jsonin.data.tbl = "tbl_user";
            for(var i=0; i<data.length; i++){
                data[i].name = "user_"+data[i].name;
            }
            $db.basicinsert(config);
        }else{
            var arrerror = [];
            var strerror = "";
            if(result[0].user_login == data[idxlogin].value){
                arrerror.push("Login exists");
            }

            if(result[0].user_email == data[idxemail].value){
                arrerror.push("Email exists");
            }

            for(var i=0; i<arrerror.length; i++){
                if(i!=0) strerror+= " & ";
                strerror += arrerror[i];
            }

            var obj = {
                error:true,
                msg:strerror
            }
            config.jsonout.data = obj;
            $db.senddata(config);
        }
    });
}

function userlist(config){
    $db.conn().query('SELECT * FROM tbl_user', function(err, result, fields){
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);
    });
    
}
    