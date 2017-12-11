const port = 8080;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [
    { id: 1, nickname: 'Bot', message: 'Welcome to chat' }
];

server.listen(port,function(){
    console.log('Server on http://localhost:' + port.toString() + '/');
});

app.use(express.static('client'));

io.on('connection', function(socket){
    console.log('New connection from: ' + socket.handshake.address);
    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);
        console.log('New message from ' + socket.handshake.address);
        io.sockets.emit('messages', messages);
    });

});

