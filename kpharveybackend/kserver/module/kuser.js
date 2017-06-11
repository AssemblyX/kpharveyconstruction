/***
Server admin user

b9f5faa3915e28d2f9b002b298b594098ed74594a6972c0fbccc9f24b27ceed0022a81df2ce3cb6a7bdbfe8cbb3ac9998260bb4dce4413b5e3a27966e340b1f8

***/
"use strict";
var $db = require('./../../kservercore/kdatabase');
var reCAPTCHA = require('recaptcha2');
var sha512 = require('js-sha512').sha512;
var $module = "user";

var PUBLIC_KEY  = '6Le2MCQUAAAAAMCOprc1GNX0h5gZswydRySwqkS7';
var PRIVATE_KEY = '6Le2MCQUAAAAAJqQrNvZyM3nv0CRLHYeVXVzWg39';

module.exports = {
    filter: function(config){
        switch(config.jsonin.config.type){
            case "handshack":
                $db.session(config);
                break;
            case "login":
                login(config);
                break;
            case "list":
            case "insert":
            case "update":
            case "delete":
                secure(config);
                break;
        }
    }
}

function secure(config){
    var secureconfig = {
        config : config,
        callback : "",
        position : ""
    }
    var type = config.jsonin.config.type;
    switch(config.jsonin.config.type){
        case "list":
            secureconfig.callback = modulelist;
            secureconfig.position = 1;
            $db.secure(secureconfig);
            break;
        case "insert":
            secureconfig.callback = moduleinsert;
            secureconfig.position = 2;
            $db.secure(secureconfig);
            break;
    }
}

function login(config){
    if(!config.client.dev.debug){
        var recaptcha = new reCAPTCHA({
          siteKey:PUBLIC_KEY,
          secretKey:PRIVATE_KEY
        })

        recaptcha.validate(config.jsonin.data.grecaptcharesponse)
        .then(function(){
          // validated and secure
            logincheck(config);
        })
        .catch(function(errorCodes){
            console.log(recaptcha.translateErrors(errorCodes));// translate error codes to human readable text
            console.log("Not Human");
            config.jsonout.data.login = false;
            config.jsonout.msg = "It appears you are not human.";
            $db.senddata(config);
        });
    }else{
        logincheck(config);
    }

}

function logincheck(config){
    var user = config.jsonin.data.user;
    var pass = config.jsonin.data.pass;
    var post = [user, user];
    var sql = "SELECT u.user_id, u.user_password, uc.client_id, c.client_name, ut.user_type_id FROM tbl_user as u ";
    sql += "LEFT JOIN tbl_user_client_lk as uc on u.user_id = uc.user_id ";
    sql += "LEFT JOIN tbl_user_type_lk as ut on u.user_id = ut.user_id ";
    sql += "LEFT JOIN tbl_client as c on uc.client_id = c.client_id ";
    sql += "WHERE u.user_login = ? or u.user_email = ? and u.user_active = 1";

    $db.conn().query(sql, post, function(err, result, fields){
        if(err)  throw err;
        config.jsonout.data = {};
        if(result.length){
            var passcheck = sha512(result[0].user_password + config.client.session.handshackid);
            if(passcheck == pass){
                console.log("userlogin");
                config.client.session.user = result[0];
                config.client.session.user.user_password = null;
                config.jsonout.data.login = true;
                config.jsonout.data.result = config.client.session.user;
                $db.senddata(config);
            }else{
                console.log("Wrong Password");
                config.jsonout.data.login = false;
                config.jsonout.msg = "Wrong User Name or Password";
                $db.senddata(config);
            }
        }else if(result.length == 0){
            console.log("NO User");
                config.jsonout.data.login = false;
                config.jsonout.msg = "Wrong User Name or Password";
                $db.senddata(config);
        }else{
            console.log("System Error");
                config.jsonout.data.login = false;
                config.jsonout.msg = "System Error";
                $db.senddata(config);
        }
    });
}

function moduleinsert(config){
    var data = config.jsonin.data.insert;
    var idxlogin = data.findIndex(x => x.name=="user_login");
    var idxemail = data.findIndex(x => x.name=="user_email");
    var sql = "SELECT user_login, user_email FROM tbl_user where user_login = ? OR user_email = ?";
    var post = [data[idxlogin].value, data[idxemail].value]
    $db.conn().query(sql, post, function(err, result, fields) 
    {
        if(err) throw err;
        if(result.length == 0){
            var json = config.jsonin.data;
            var sql = "INSERT INTO tbl_user SET ?";
            var post = {};
            for(var i=0; i<json.insert.length; i++){
                post[json.insert[i].name] = json.insert[i].value;
            }
            $db.conn().query(sql, post, function(err, result, fields) 
            {
                if(err) throw err;
                config.jsonout.data = result.insertId;
                var sql = "INSERT INTO tbl_user_type_lk SET ?"
                var post = {
                    user_id:result.insertId,
                    user_type_id:1
                }
                $db.conn().query(sql, post, function(err, result, fields) 
                {
                    if(err) throw err;
                    $db.senddata( config );
                });
            });
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

function modulelist(config){
    var sql = "SELECT user_login, user_email FROM tbl_user WHERE user_active = 1";
    $db.conn().query(sql, function(err, result, fields){
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);
    });
    
}
    