var socket = io.connect(location.origin);
var messageInput = document.getElementById('message');
var nicknameInput = document.getElementById('nickname');
var nickname = '';

socket.on('messages', function(data) {
    renderMessages(data);
});

function renderMessages(messages) {
    var html = messages.map(function(item, index) {
        return (`
            <div class="message">
                <p>
                    <strong>${item.nickname}</strong>:
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
    messageInput.focus();
}

function addMessage(event) {

    if (messageInput.value == '')
        return false;

    nickname = nickname != '' ? nickname : nicknameInput.value;
    socket.emit('add-message', {
        nickname: nickname,
        message: messageInput.value
    });
    nicknameInput.style.display = 'none';
    messageInput.value = '';

    return false;
}