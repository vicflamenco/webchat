var socket = io.connect("http://localhost:8080");

socket.on('messages', function(data){
    renderMessages(data);
});

function renderMessages(messages) {
    var html = messages.map(function(item, index){
        return (`
            <div class="message">
                <p>
                    <strong>
                        ${item.nickname}
                    </strong>:
                </p>
                <p>
                    ${item.message}
                </p>
            </div>
        `)
    }).join(" ");

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(event) {

    var nicknameInput = document.getElementById('nickname');
    var messageInput = document.getElementById('message');

    var message = {
        nickname: nicknameInput.value,
        message: messageInput.value
    };
    nicknameInput.style.display = 'none';
    messageInput.value = '';
    socket.emit('add-message', message);
    return false;
} 