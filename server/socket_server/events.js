const joinRoomCallMe = (socket) => (payload) => {
    console.log(`user ${payload.fromName} wants to join the room ${payload.fromRoom}`);
    // Join the room
    socket.join(payload.fromRoom, () => {
        // Notify the user to talk with (in the same main room)
        socket.to(payload.fromRoom).emit('joinRoomCallMe', payload);
    });
}

const joinRoomMsg = (socket) => (payload) => {
    console.log(`user ${payload.fromName} wants to join the room ${payload.fromRoom}`);
    // Notify the user to talk with (in the same main room) only message
    socket.to(payload.fromRoom).emit('joinRoomMsg', payload);
}

const messageInRoom = (socket) => (payload) => {
    console.log(`User ${payload.fromName} wants sends a message to ${payload.fromRoom}`);
    // Private message to the user
    socket.to(payload.fromRoom).emit('messageInRoom', payload);
}

const leaveRoom = (socket) => (payload) => {
    console.log(`user ${payload.fromName} wants to leave the ${payload.fromRoom}`);
    // Notify all the users in the same room
    socket.to(payload.fromRoom).emit('leaveRoom', payload);

    // Leave the socket
    socket.leave(payload.fromRoom, () => {
        console.log(`user ${payload.fromName} left the room ${payload.fromRoom}`);
    })
}

const messagePCSignaling = (socket) => (message) => {
    console.log(`User ${message.fromName} sends pc message to ${message.fromRoom}`);

    console.log(message);
    // Private signaling to the user
    let roomH = message.fromRoom
    socket.to(roomH).emit('messagePC', message);
}

const disconnected = (socket) => () => {
    console.log(`Socket ${socket.id} disconnected`);
}

module.exports = {
    joinRoomCallMe,
    joinRoomMsg,
    messageInRoom,
    leaveRoom,
    messagePCSignaling,
    disconnected
}