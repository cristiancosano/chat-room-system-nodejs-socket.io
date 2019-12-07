
class User {
    constructor(){
        this.users = []
    }

    addUser(id, name){
        this.users.push({id, name})
        return this.users
    }
    getUser(id){
        return this.users.filter(user => user.id === id)[0]
    }
    getUserByName(name){
        return this.users.filter(user => user.name == name)[0]
    }
    getUsers(){
        return this.users
    }
    getUsersFromChatRoom(chatRoom){

    }
    deleteUser(id){
        let deletedUser = this.getUser(id)
        this.users = this.users.filter((user) => user.id != id)
        return deletedUser
    }
}

module.exports = {
    User
}