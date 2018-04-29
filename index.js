
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });


//io.on('connection', function(socket){
 //   socket.on('chat message', function(msg){
 //       console.log('message: ' + msg);
 //       io.emit('chat message', msg);
 //   });
//});
var change = 0;

function intervalFunc(arg) {
    //var rand = Math.random() * 200;
    //rand = Math.floor(rand);
    //io.emit('chat message', '{ "values": [ [' + rand + ',20], [30,40] ] }');
    

    // Read Synchrously
    var fs = require("fs");

    if (change == 0) {
        //var content = fs.readFileSync('data.json');
        var content = fs.readFileSync('test3.json');
        //console.log("Output Content : \n"+ content);
        change = 1;
    }
    else if (change == 1) {
        var content = fs.readFileSync('test.json');
        change = 2;
    }
    else {
        var content = fs.readFileSync('test2.json');
        change = 0;
    } 


    //io.emit('jpet', '{ "values": [ [100,20], [30,40] ] }');
    content = content.toString('utf8')
    io.emit('jpet', content);
}

setInterval(intervalFunc, 500);


http.listen(3000, function(){
  console.log('listening on *:3000');
});
