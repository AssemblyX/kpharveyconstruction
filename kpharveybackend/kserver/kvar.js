"use strict";

var $sockettitle    = "kpharvey-websocket"
var $serverport     = 7000;
var $socketport     = 7001;
var $fileport       = 7002;
var $lookupid       = "project_id";
var $certfolder      = "kphcprojects.ca";

var $dbconfig = {
    host     : 'localhost',
    user     : 'root',
    //user     : 'kpharvey',
    password : 'f0826096b4d0eb2f',
    database : 'kpharveyconstruction'
};

module.exports = {
    serverport:serverport,
    socketport:socketport,
    fileport:fileport,
    sockettitle:sockettitle,
    dbconfig:dbconfig,
    lookupid:lookupid,
    certfolder:certfolder
}

function certfolder(){
    return $certfolder;
}

function fileport(){
    return $fileport;
}

function serverport(){
    return $serverport;
}

function socketport(){
    return $socketport;
}

function sockettitle(){
    return $sockettitle;
}

function dbconfig(){
    return $dbconfig;
}

function lookupid(){
    return $lookupid;
}