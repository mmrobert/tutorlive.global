const events = require('./events.js')
const config = require('./../config')

// When connecting
const onConnection = (socket) => {

    console.log(`Socket connected to port ${config.PORT}`);

    // Listening for joining a room
    socket.on('joinRoomCallMe', events.joinRoomCallMe(socket));

    // Listening for joining a room only message
    socket.on('joinRoomMsg', events.joinRoomMsg(socket));

    // Listening for new room messages
    socket.on('messageInRoom', events.messageInRoom(socket));

    // Leave room
    socket.on('leaveRoom', events.leaveRoom(socket));

    // Private message for Signaling PeerConnection
    socket.on('messagePC', events.messagePCSignaling(socket));

    // Disconnect
    socket.on('disconnect', events.disconnected(socket));
}

exports.onConnection = (io) => {
    io.on('connection', onConnection);
}