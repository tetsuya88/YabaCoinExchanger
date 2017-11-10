var osc = require('node-osc');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var fs = require('fs');
var app = express();
var rimraf = require('rimraf');
var jsonfile = require('jsonfile');
var commonconfig = require('../../commonconfig.js');

var cnt = 0;
var td_osc = new osc.Client('127.0.0.1', 3000);
var provider_ip = commonconfig.providerIp;
var provider_osc = new osc.Client(provider_ip, 4000);
console.log(commonconfig.providerIp);
app.use(express.static('htdocs'));

var server = http.createServer(app).listen(8080);  // ポート競合の場合は値を変更

console.log("exchangerのサーバ起動");

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        console.log(data);
				let sendData = JSON.stringify(data);

        console.log("TRY SAVE TO DATABASE");
        sendData = string_to_utf8_bytes(sendData);
        provider_osc.send('/YabaCoin', sendData);
        console.log("SAVED TO DATABASE");

        console.log("TRY WRITE FILE");
        textfileWrite(data);

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


//tochDesignerに渡すデータを書き込む関数
function textfileWrite(data) {

  data = data.value;

  var jsondata = {};

  rimraf('./data/textsdata', function (err){

    //データの削除に失敗したらエラーを出力し終了
    if (err) {
        console.error("ERROR at rmdir");
        console.error(err);
        process.exit(1);
    }
    console.error("Deleted datafolder");

    //ファイルを作成
    fs.mkdir('./data/textsdata', function (err) {
      //ファイル作成に失敗したらエラーを出力し終了
      if (err) {
          console.error("ERROR at mkdir");
          console.error(err);
          process.exit(1);
      }
      console.error("Created datafolder");

      //JSONデータに入るオブジェクトの中身を入れる
      jsondata["text"] = {
            "age" : data.age,
            "gender" : data.gender,
            "yaba_event" : data.YE,
            "likedislike" : data.likedislike,
            "joysad" : data.joysad,
            "angerfear" : data.angerfear,
            "scalar" : data.scalar
      }

      console.log(jsondata);

      //ファイルの書き込み
      writeFile("./data/textsdata/text.txt", data.YE);

      jsonfile.writeFile("./data/data.json", jsondata, {
          encoding: 'utf-8',
          replacer: null,
          spaces: null
      }, function (err) {
          console.log("Saved jsondata");
          td_osc.send('/YabaCoin', "done");
          console.log("ALL DONE");
      });

    });
  }); //END of rimraf(function{});
}



//ファイルの書き込み関数
function writeFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
      throw err;
    }
    if(cnt == 0){
      cnt ++;
      console.log("writeFile Pass");
    }
  });
}
