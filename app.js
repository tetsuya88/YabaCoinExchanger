var osc = require('node-osc');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var fs = require('fs');
var app = express();
var client = new osc.Client('127.0.0.1', 3000);

var provider_ip = "192.168.3.93";
var provider_osc = new osc.Client(provider_ip, 4000);

app.use(express.static('htdocs'));

var server = http.createServer(app).listen(8080);  // ポート競合の場合は値を変更

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        console.log(data);
				let sendData = JSON.stringify(data);

      	client.send('/YabaCoin', sendData);

        sendData = string_to_utf8_bytes(sendData);
        provider_osc.send('/YabaCoin', sendData);
    });
});


// 文字列をUTF8のバイト配列に変換
function	string_to_utf8_bytes(text){
    var result = [];
    if (text == null)
        return result;
    for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (c <= 0x7f) {
            result.push(c);
        } else if (c <= 0x07ff) {
            result.push(((c >> 6) & 0x1F) | 0xC0);
            result.push((c & 0x3F) | 0x80);
        } else {
            result.push(((c >> 12) & 0x0F) | 0xE0);
            result.push(((c >> 6) & 0x3F) | 0x80);
            result.push((c & 0x3F) | 0x80);
        }
    }
    return result;
}


/*var client = new osc.Client('127.0.0.1', 3000);

setInterval(function(){
  client.send('/recieve', "Hello world!");
  console.log("messege send");
}, 5000);*/
