var osc = require('node-osc');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var fs = require('fs');
var app = express();
var client = new osc.Client('127.0.0.1', 3000);

app.use(express.static('htdocs'));

var server = http.createServer(app).listen(8080);  // ポート競合の場合は値を変更

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        console.log(data);
				let sendData = JSON.stringify(data);
      	client.send('/YabaCoin', sendData);
    });
});

/*var client = new osc.Client('127.0.0.1', 3000);

setInterval(function(){
  client.send('/recieve', "Hello world!");
  console.log("messege send");
}, 5000);*/
