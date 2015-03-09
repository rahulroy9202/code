var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
  
  setTimeout(function(){
	timeBroadcast();
  },(1000 - (new Date()).getMilliseconds()));
  
});

function timeBroadcast(){
  io.emit('time_broadcast', new Date());
  //console.log((new Date()).getMilliseconds());		//uncomment to get rough offset. should be less than 5
  
  setTimeout(function(){
	timeBroadcast();
  },(1000 - (new Date()).getMilliseconds()));
}