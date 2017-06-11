/***
KPHarvey 
Server admin client

***/
"use strict";
var $db = require('./../../kservercore/kdatabase');

module.exports = {
    filter: function(config){
        switch(config.jsonin.config.type){
            case "idtext":
                idtext(config);
                break;
            case "list":
                modulelist(config);
                break;
            case "projectlist":
                projectlist(config);
                break;
            case "projectfiles":
                projectfiles(config);
                break;
            case "insert":
            case "projectinsert":
            case "fileremove":
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
        case "idtext":
            secureconfig.callback = idtext;
            secureconfig.position = 1;
            break;
        case "list":
            secureconfig.callback = modulelist;
            secureconfig.position = 1;
            break;
        case "insert":
            secureconfig.callback = moduleinsert;
            secureconfig.position = 2;
            break;
        case "projectinsert":
            secureconfig.callback = projectinsert;
            secureconfig.position = 3;
            break;
        case "projectlist":
            secureconfig.callback = projectlist;
            secureconfig.position = 4;
            break;
        case "projectfiles":
            secureconfig.callback = projectfiles;
            secureconfig.position = 5;
            break;
        case "fileremove":
            secureconfig.callback = fileremove;
            secureconfig.position = 6;
            break;

    }
    $db.secure(secureconfig);
}

function idtext(config){
    var sql = "SELECT client_name FROM tbl_client where client_id = '" + config.jsonin.data.id + "'";
    $db.conn().query(sql, function(err, result, fields)
    {
        var str = result[0].study_protocolnum;
        config.jsonout.data = str;
        $db.senddata(config);
    });
}

function moduleinsert(config){
    var data = config.jsonin.data.insert;
    var idxname = data.findIndex(x => x.name=="client_name");
    var idxlogin = data.findIndex(x => x.name=="user_login");
    var idxpass = data.findIndex(x => x.name=="user_password");
    var sql = "SELECT client_name FROM tbl_client where client_name = ?";
    var post = [data[idxname].value];

    $db.conn().query(sql, post, function(err, result, fields) 
    {
        if(err) throw err;
        if(result.length == 0){

            var sql = "SELECT user_id FROM tbl_user where user_login = ?";
            var post = [data[idxlogin].value]
            $db.conn().query(sql, post, function(err, result, fields) 
            {
                if(err) throw err;
                if(result.length == 0){
                    var sql = "INSERT INTO tbl_client SET ?";
                    var post = {
                        client_name : data[idxname].value
                    };
                    $db.conn().query(sql, post, function(err, result, fields) 
                    {
                        if(err) throw err;
                        var $client_id = result.insertId;
                        config.jsonout.data = $client_id;
                        
    
                        var sql = "INSERT INTO tbl_user SET ?";
                        var post = {
                            user_login : data[idxlogin].value,
                            user_password : data[idxpass].value
                        };

                        $db.conn().query(sql, post, function(err, result, fields) 
                        {
                            if(err) throw err;
                            var $user_id = result.insertId;
                            var sql = "INSERT INTO tbl_user_type_lk SET ?"
                            var post = {
                                user_id:$user_id,
                                user_type_id:2
                            }
                            $db.conn().query(sql, post, function(err, result, fields) 
                            {
                                if(err) throw err;

                                var sql = "INSERT INTO tbl_user_client_lk SET ?"
                                var post = {
                                    user_id:$user_id,
                                    client_id:$client_id,
                                    role_id:1
                                }
                                $db.conn().query(sql, post, function(err, result, fields) 
                                {
                                    if(err) throw err;
                                    $db.senddata( config );
                                });
                            });
                        });
                    });
                }else{
                    var obj = {
                        error:true,
                        msg:"User name exists."
                    }
                    config.jsonout.data = obj;
                    $db.senddata(config);
                }
            });
        }else{
            var arrerror = [];
            var strerror = "";

            if(result[0].client_name == data[idxname].value){
                arrerror.push("Name exists");
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
    $db.conn().query('SELECT * FROM tbl_client', function(err, result, fields){
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);
    });
}

function projectlist(config){
    var client_id = config.jsonin.data.client_id;
    var sql = "SELECT p.project_id, p.project_name FROM tbl_project p ";
    sql += "INNER JOIN tbl_client_project_lk cp ON p.project_id = cp.project_id ";
    sql += "WHERE cp.client_id = '" + client_id + "'and p.project_active = 1";
    $db.conn().query(sql, function(err, result, fields) 
    {
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);
    });
}

function projectinsert(config){
    var data = config.jsonin.data.insert;
    var client_id = config.jsonin.data.client_id
    var idxname = data.findIndex(x => x.name=="project_name");
    
    var sql = "SELECT p.project_name FROM tbl_project p ";
    sql += "INNER JOIN tbl_client_project_lk cp ON p.project_id = cp.project_id ";
    sql += "WHERE cp.client_id = ? AND p.project_name = ? and p.project_active = 1";
    var post = [client_id, data[idxname].value];

    $db.conn().query(sql, post, function(err, result, fields) 
    {
        if(err) throw err;
        if(result.length == 0){
            var sql = "INSERT INTO tbl_project SET ? ";
            var post = {
                project_name : data[idxname].value
            }
            $db.conn().query(sql, post, function(err, result, fields) 
            {
                if(err) throw err;
                
                var project_id = result.insertId;
                
                var sql = "INSERT INTO tbl_client_project_lk SET ?";
                var post = {
                    client_id : client_id,
                    project_id : project_id
                }
                $db.conn().query(sql, post, function(err, result, fields) 
                {
                    config.jsonout.data = project_id;
                    $db.senddata( config );
                });
            });

        }else{
            var arrerror = [];
            var strerror = "";

            if(result[0].project_name == data[idxname].value){
                arrerror.push("Name exists");
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

function fileremove(config){
    var file_id = config.jsonin.data;
    var sql = "UPDATE tbl_file SET file_active = 0 WHERE file_id = ?";
    var post = [file_id]
    $db.conn().query(sql, post, function(err, result, fields)
    {
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);     
    });
}

function projectfiles(config){
    var sql = "SELECT f.file_id, f.file_nameorig, f.file_createdate FROM tbl_file f ";
    sql += "INNER JOIN tbl_project_file_lk pf ON f.file_id = pf.file_id ";
    sql += "WHERE pf.project_id = ? AND f.file_active = 1";
    var post = [config.jsonin.data.project_id];

    $db.conn().query(sql, post, function(err, result, fields)
    {
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);     
    });
    
}
    