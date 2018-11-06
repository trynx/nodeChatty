// Library imports
let express = require('express');
let socketIO = require('socket.io');
let http = require('http');

// Local imports


// Express config
let port = process.env.PORT || 3000;
var app = express();

// Socket.io config
var server = http.createServer(app);
var io = socketIO(server);

// Event listener
// User connected
io.on('connection', (socket) => {
    console.log('New user connected'); 
    
    // A user join the server
    socket.on('join', (userNickname) => {
        console.log(`User ${userNickname} connected`);
        
        socket.broadcast.emit('userConnected', `${userNickname} has connected`);
    });
    
    socket.on('newMessage', (message) => {

        let msg = {
            "from": message.from,
            "text": message.text,
            "createdAt": new Date().getTime()};

        // Send to everyone the new message
        io.emit('newText', msg);

    });

    // User disconnected
    socket.on('disconnect', (reason) => {
      console.log('An user disconnected');
    });
});
 


// Start express -> start server
server.listen(port, () => {
    console.log('Started on port', port);
});


