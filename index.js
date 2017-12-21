const PORT = 3000;

var messages = [
    { id: 1, nickname: 'Bot', message: 'Welcome to chat' }
];

var express = require('express');
var app = express();
var httpServer = require('http').Server(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(PORT, () => {
    console.log('Server listening port:' + PORT.toString() + '/');
});

var io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
    console.log('New connection from: ' + socket.handshake.address);
    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data);
        console.log('New message from ' + socket.handshake.address);
        io.sockets.emit('messages', messages);
    });
});