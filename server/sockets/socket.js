const {io} = require('../server')
const {User} = require('../classes/users')
const {createMessage} = require('../utils/utils')

let listUsers = new User();


io.on('connection', (client) => {
    //var user = listUsers.getUser(client.id)
    
    console.log('User connected');


    client.on('sendMessage', (message, callback) => {
        let user = listUsers.getUser(client.id)
        
        client.broadcast.emit('sendMessage', createMessage(user.name, message))
        callback(createMessage(user.name, message))
    })

    /* client.on('privateMessage', (res, callback) => {
        if(res.receiver!=undefined && res.message!=undefined){
            let receiver = listUsers.getUserByName(res.receiver).id
            let user = listUsers.getUser(client.id)
            client.broadcast.to(receiver).emit('privateMessage', createMessage(user.name, message))
        }
        else{
            client.emit('clientError', 'PM Error: Invalid params')
        }
        
    })
 */

    client.on('startChat', (data, callback) => {
        if(!data.user){
            return callback({
                ok: false,
                message: 'The user is required'
            })
        }
        else{
            listUsers.addUser(client.id, data.user)
            let users = listUsers.getUsers()
            callback(users)
            client.broadcast.emit('listUsers', listUsers.getUsers())
            console.log(data);
        }
        
    })

    client.on('disconnect', () => {
        let deletedUser = listUsers.deleteUser(client.id)
        console.log('User disconnected');
        client.broadcast.emit('pushMessage', createMessage('admin', `The user ${deletedUser.name} exits from chat`))
        client.broadcast.emit('listUsers', listUsers.getUsers())
    })
    
})