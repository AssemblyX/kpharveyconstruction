#!/bin/bash
SITENAME="kpharvey"
SITEPORT="7000"
ROOTPATH="/home/kenneth/Documents/github/kpharveyconstruction/kpharveybackend"

screen -S "$SITENAME-server" -d -m
sleep 1
screen -S "$SITENAME-server" -X stuff "cd $ROOTPATH\r"
sleep 1
screen -S "$SITENAME-server" -X stuff "node /usr/local/lib/node_modules/http-server/bin/http-server  -p $SITEPORT\r"
sleep 1
echo "$SITENAME-server started"

screen -S "$SITENAME-socket" -d -m
sleep 1
screen -S "$SITENAME-socket" -X stuff "cd  $ROOTPATH/kserver\r"
sleep 1
screen -S "$SITENAME-socket" -X stuff "node $ROOTPATH/kserver/kwebsocket.js\r"
sleep 1
echo "$SITENAME-socket started"

screen -S "$SITENAME-file" -d -m
sleep 1
screen -S "$SITENAME-file" -X stuff "cd  $ROOTPATH/kserver\r"
sleep 1
screen -S "$SITENAME-file" -X stuff "node $ROOTPATH/kserver/kfileupload.js\r"
echo "$SITENAME-file started"

echo "******************************************"
echo "$SITENAME application started"
echo "******************************************"