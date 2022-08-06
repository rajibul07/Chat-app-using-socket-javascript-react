// const io = require('socket.io')(8000)
const io = require("socket.io")(8002, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const fs = require("fs");
// const json = require("./config.json")
// console.log(json);

// httpServer.listen(8000);
const allUsers = [];
const users = [];

io.on('connection', socket =>{
    if (allUsers.length < 2){
        socket.join('some_room');
    }
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        if (allUsers.length < 2){
            console.log("Joining")
            users[socket.id] = name;
            allUsers.push(name);
            socket.broadcast.emit('user-joined', name);
            
        }
        else {
            console.log("Refused")
            socket.broadcast.emit('connection-busy', name);
        }
        // if (users.length < 2){
        //     users[socket.id] = name;
        //     socket.emit('user-joined', name);
        // }
        // else {
        //     delete users[socket.id];
        //     console.log("Connection busy")
        // }
    });

    console.log(users[socket.id])
        socket.on('send', message =>{
            if (users[socket.id]){
                console.log("Ok")
                socket.to("some_room").emit('receive', {message: message, name: users[socket.id]});
            }
        });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        allUsers.pop();
    });


});