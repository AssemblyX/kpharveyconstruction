"use strict";

var $sockettitle = "kpharvey-websocket"
var $serverport  = 80;
var $socketport = 8080;
var $fileport = 443;

var $dbconfig = {
    host     : 'localhost',
    user     : 'root',
    //user     : 'kpharvey',
    password : 'f0826096b4d0eb2f',
    //password : 'accutron',
    database : 'kpharveyconstruction'
};

module.exports = {
    serverport:serverport,
    socketport:socketport,
    fileport:fileport,
    sockettitle:sockettitle,
    dbconfig:dbconfig
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