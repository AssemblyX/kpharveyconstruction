#!/bin/bash
SITENAME="kpharvey"
SITEPORT="7000"
#ROOTPATH="/home/kenneth/Documents/github/kpharveyconstruction/kpharveybackend"
ROOTPATH="/home/kphcprojects.ca/public_html"

screen -S "$SITENAME-server" -d -m
sleep 1
screen -S "$SITENAME-server" -X stuff "cd $ROOTPATH\r"
sleep 1
screen -S "$SITENAME-server" -X stuff "forever /usr/local/lib/node_modules/http-server/bin/http-server /home/kphcprojects.ca/public_html/ -p 7000 -S -C /etc/letsencrypt/live/kphcprojects.ca/cert.pem -K /etc/letsencrypt/live/kphcprojects.ca/privkey.pem\r"
sleep 1
echo "$SITENAME-server started"

screen -S "$SITENAME-socket" -d -m
sleep 1
screen -S "$SITENAME-socket" -X stuff "cd  $ROOTPATH/kservercore\r"
sleep 1
screen -S "$SITENAME-socket" -X stuff "node $ROOTPATH/kservercore/kwebsocket.js\r"
sleep 1
echo "$SITENAME-socket started"

screen -S "$SITENAME-file" -d -m
sleep 1
screen -S "$SITENAME-file" -X stuff "cd  $ROOTPATH/kservercore\r"
sleep 1
screen -S "$SITENAME-file" -X stuff "node $ROOTPATH/kservercore/kfileupload.js\r"
echo "$SITENAME-file started"

echo "******************************************"
echo "$SITENAME application started"
echo "******************************************"