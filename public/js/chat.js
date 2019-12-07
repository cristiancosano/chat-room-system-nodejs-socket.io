let message= $('#messageContent')
let chatBox = $('#divChatbox')
let userDiv = $('#usersDiv')

function renderUsers(users){
    let chat = new URLSearchParams(window.location.search).get('chat')
    let html = `<li>
                    <a href="javascript:void(0)" class="active"> ${chat} Chat</a>
                </li>`

    for (let i = 0; i < users.length; i++) {
        html += `<li>
                    <a data-name="${users[i].name}" href="javascript:void(0)"><img src="assets/images/users/${i+1}.jpg" alt="user-img" class="img-circle"> <span>${users[i].name} <small class="text-success">online</small></span></a>
                </li>`     
        //console.log(html) 
    }

    userDiv.html(html)

    $('#usersDiv>li>a').click( function ()  {
        let data = $(this).data('name')
        if(data) console.log(data)
    })

}

function renderMessages(data, me){
    let html = ''
    let date = new Date(data.date)
    let hour = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    if(me){
        html = `<li class="reverse">
                    <div class="chat-content">
                        <h5>${data.name}</h5>
                        <div class="box bg-light-inverse">${data.message}</div>
                    </div>
                    <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>
                    <div class="chat-time">${hour}</div>
                </li>`
    }
    else{
        html =  `<li class="animated fadeIn">
                    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                    <div class="chat-content">
                        <h5>${data.name}</h5>
                        <div class="box bg-light-info">${data.message}</div>
                    </div>
                    <div class="chat-time">${hour}</div>
                </li>`
    }
    chatBox.append(html)
    scrollBottom()
}


function scrollBottom() {

    // selectors
    var newMessage = chatBox.children('li:last-child');

    // heights
    var clientHeight = chatBox.prop('clientHeight');
    var scrollTop = chatBox.prop('scrollTop');
    var scrollHeight = chatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatBox.scrollTop(scrollHeight);
    }
}

$('#sendMessage').submit(function (e){
    e.preventDefault()
    if(message.val().trim().length !== 0){
        console.log(message.val());
    }
    socket.emit('sendMessage', message.val(), (data)=>{
        renderMessages(data, true)
        message.val('').focus()
    })
})


