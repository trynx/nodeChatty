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
    // User disconnected
    socket.on('disconnect', (reason) => {
      console.log('An user disconnected');
    });

    socket.on('join', (userNickname) => {
        console.log(`User ${userNickname} connected`);

        socket.broadcast.emit('userConnected', `${userNickname} has connected`);
    });
});
 


// Start express -> start server
server.listen(port, () => {
    console.log('Started on port', port);
});


