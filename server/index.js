const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let rooms = [];

io.on('connection', (socket) => {

    socket.emit('user-connected', socket.id);

    socket.on('send-message', (data) => {
        const [, socketRoom] = socket.rooms;
        socket.to(socketRoom).emit('receive-message', {message: data.message});
        socket.emit('receive-message', {message: data.message});
    });

    socket.on('join-room', (playerName, roomId) => {

        const findRoom = () => {
            return rooms.findIndex(room => room.roomId === roomId);
        };

        // change condition to be able to create multiple rooms. right now it only creates new rooms when there's no rooms.
        if (rooms.length === 0 || findRoom() === -1) {
            rooms.push({roomId: roomId, players: [{name: playerName, socketId: socket.id, roomId: roomId}]});
            console.log(rooms);
        } else {
            rooms.forEach((room) => {
                if (room.roomId === roomId) {
                    room.players.push({name: playerName, socketId: socket.id, roomId: roomId});
                    console.log(rooms);
                }
            })
        }

        socket.join(roomId);

        rooms.forEach((room) => {
            if (room.roomId === roomId) {
                io.to(roomId).emit('joined-room', room.players);
            }
        });

        // console.log(`${playerName} (${socket.id}) has joined room ${roomId}`);
    });

    socket.on("disconnecting", () => {
        rooms.forEach((room) => {
            const playerIndex = room.players.findIndex(player => player.socketId === socket.id);
            if (playerIndex !== -1) {
                const [, socketRoom] = socket.rooms;
                io.to(socketRoom).emit('player-disconnected', socket.id);
                room.players.splice(playerIndex, 1);
            }
        });

        const roomToDelIndex = rooms.findIndex(room => room.players.length < 1);
        if (roomToDelIndex !== -1) {
            rooms.splice(roomToDelIndex, 1);
        }

        console.log(rooms);
    });

});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});