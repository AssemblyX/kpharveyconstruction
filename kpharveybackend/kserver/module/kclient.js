/***
KPHarvey 
Server admin client

***/
"use strict";
var $db = require('./../../kservercore/kdatabase');

module.exports = {
    filter: function(config){
        switch(config.jsonin.config.type){
            case "insert":
                moduleinsert(config);
                break;
            case "list":
                modulelist(config);
                break;
            case "idtext":
                idtext(config);
                break;
            case "projectinsert":
                projectinsert(config);
                break;
            case "projectlist":
                projectlist(config);
                break;
            case "projectimages":
                projectimages(config);
                break;
        }
    }
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
    var sql = "SELECT client_name FROM tbl_client where client_name = '" + data[idxname].value + "'";
    $db.conn().query(sql, function(err, result, fields) 
    {
        if(err) throw err;
        if(result.length == 0){
            config.jsonin.data.tbl = "tbl_client";
            $db.basicinsert(config);
            console.log(data);
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
    sql += "WHERE cp.client_id = '" + client_id + "' AND p.project_name = '" + data[idxname].value + "' and p.project_active = 1";

    $db.conn().query(sql, function(err, result, fields) 
    {
        if(err) throw err;
        if(result.length == 0){
            var sql = "INSERT INTO tbl_project (project_name) values ('"+data[idxname].value+"')";
            $db.conn().query(sql, function(err, result, fields) 
            {
                if(err) throw err;
                
                var project_id = result.insertId;
                
                var sql = "INSERT INTO tbl_client_project_lk (client_id, project_id) values ('"+client_id+"', '"+project_id+"')";
                $db.conn().query(sql, function(err, result, fields) 
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

function projectimages(config){
    var sql = "SELECT i.image_id, i.image_filename FROM tbl_image i ";
    sql += "INNER JOIN tbl_project_image_lk pi ON i.image_id = pi.image_id ";
    sql += "WHERE pi.project_id = '" + config.jsonin.data.project_id + "'";
    $db.conn().query(sql, function(err, result, fields)
    {
        if(err) throw err;
        config.jsonout.data = result;
        $db.senddata(config);     
    });
    
}
    