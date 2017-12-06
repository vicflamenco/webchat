//var socket = io();

var socket = io.connect("http://localhost:8080");

socket.on('messages', function(data){
    console.log(data);
    renderMessages(data);
});

function renderMessages(messages) {
    var html = messages.map(function(item, index){
        return (`
            <div class="message">
                <strong>${item.nickname}</strong>:
                <p>${item.text}</p>
            </div>
        `)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
};