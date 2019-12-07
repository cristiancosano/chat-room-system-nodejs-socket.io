let socket = io()

let params = new URLSearchParams(window.location.search)

if(!params.has('user')){
    window.location = 'index.html'
    throw new Error('User is required')
}

socket.on('connect', ()=> {
    console.log('Connected to server');

    socket.emit('startChat', {user: params.get('user')}, (res) => {
        renderUsers(res)
    })
})

socket.on('disconnect', () => {
    console.log('Server connection lost')
})

/* socket.on('pushMessage', (res) => {
    console.log(res);
})
 */
socket.on('listUsers', (res) => {
    renderUsers(res)
})

socket.on('sendMessage', (res) => {
    renderMessages(res)
    console.log(res);
})

/* socket.on('privateMessage', (res) => {
    console.log(res);
}) */

$('button').click(() => {
    socket.emit('privateMessage', $('#privateMessageText').text(),  )
})

socket.on('clientError', (res) => {
    console.log(res);
})