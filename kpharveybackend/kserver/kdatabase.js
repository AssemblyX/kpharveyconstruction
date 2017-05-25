"use strict";
var mysql = require('mysql');
var $dbconn;

var dbconfig = {
    host     : 'localhost',
    //user     : 'root',
    user     : 'kpharvey',
    password : 'f0826096b4d0eb2f',
    //password : 'accutron',
    database : 'kpharveyconstruction'
};



module.exports = {
    conn:conn,
    senddata:senddata,
    basicinsert:basicinsert,
    interface: function(config){

        switch(config.jsonin.type){
            case "getprocedurelist":
                config.kdatabase = "tbl_procedure";
                getall(config);
                break;
            case "getnonprocedurelist":
                config.kdatabase = "tbl_nonprocedure";
                getall(config);
                break
            case "getschedulelist":
                config.kdatabase = "tbl_schedule";
                getall(config);
                break
            case "getuserlist":
                getall("tbl_user");
                break
            case "userinsert":
                kuser.test();
                //userinsert(jsonin.data);
                break;
        }
    }
}

function databaseconnection(){
    console.log("databaseconnection");
    $dbconn = mysql.createConnection(dbconfig);

    $dbconn.connect(function(err){
        if(err){
            console.log('Error connecting to Db', err);
            setTimeout(databaseconnection, 2000);
            return;
        }
        console.log('Connection established');
    });

    $dbconn.on('error',function(err){
        console.log('db_wrror', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            databaseconnection();
        } else {
            throw err;
        }
    });
}

databaseconnection();

// function userinsert(json){
//     var idxlogin = json.insert.findIndex(x => x.name=="login");
//     var idxemail = json.insert.findIndex(x => x.name=="email");
//     var sql = "SELECT user_login, user_email FROM tbl_user where user_login = '" + json.insert[idxlogin].value + "' OR user_email = '" + json.insert[idxemail].value + "'";
//     conn.query(sql, function(err, result, fields) 
//     {
//         if(err) throw err;
//         if(result.length == 0){
//             json.tbl = "tbl_user";
//             for(var i=0; i<json.insert.length; i++){
//                 json.insert[i].name = "user_"+json.insert[i].name;
//             }
//             basicinsert(json);
//         }else{
//             var arrerror = [];
//             var strerror = "";
//             if(result[0].user_login == json.insert[idxlogin].value){
//                 arrerror.push("Login exists");
//             }

//             if(result[0].user_email == json.insert[idxemail].value){
//                 arrerror.push("Email exists");
//             }

//             for(var i=0; i<arrerror.length; i++){
//                 if(i!=0) strerror+= " & ";
//                 strerror += arrerror[i];
//             }

//             var obj = {
//                 error:true,
//                 msg:strerror
//             }
//             senddata(obj);
//         }
//     });
// }

function conn(){
    return $dbconn;
}

function basicinsert(config){
    var json = config.jsonin.data
    var sql = "INSERT INTO " + json.tbl;
    var cols = " ("
    var val = "(";
    for(var i=0; i<json.insert.length; i++){
        cols += " " + json.insert[i].name + ",";
        val += " '" + json.insert[i].value + "', ";
    }
    cols = cols.replace(/,\s*$/, "");
    val = val.replace(/,\s*$/, "");

    cols += ")";
    val += ")";

    sql += cols + " VALUES " + val;
    conn().query(sql, function(err, result, fields) 
    {
        if(err) throw err;
        config.jsonout.data = result.insertId;
        senddata( config );
    });
}

function getall(config){
    conn().query('SELECT * FROM '+config.kdatabase, function(err, result, fields) 
    {
        if(err) throw err;
        config.jsonout.data = result;
        senddata(config);
    });
}

function senddata(config){
    config.client.sendUTF(JSON.stringify( config.jsonout ));
}