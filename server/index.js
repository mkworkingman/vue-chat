const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

let users = [];

io.on('connection', socket => {
  socket.on('joined', nick => {
    socket.nick = nick;
    users.push({id: socket.id, nick});

    socket.emit('users-update', {
      users,
      text: `Welcome, ${nick}!`
    });

    socket.broadcast.emit('users-update', {
      users,
      text: nick + ' joined.'
    });

    socket.on('disconnect', () => {
      users = users.filter(user => user.id !== socket.id);
      io.emit('users-update', {
        users,
        text: socket.nick + ' has left.'
      });
    });

    socket.on('msg-send', ({text, room}) => {
      if (room === 'general') {
        io.emit('user-msg', {
          id: socket.id,
          text,
          user: socket.nick,
          room
        });
      } else {
        io.to(room).emit('user-msg', {
          id: socket.id,
          text,
          user: socket.nick,
          room
        });
      }
    });

    socket.on('chat-private', ({id, user}) => {
      const roomId = socket.id > id ? 'room:' + socket.id + '-' + id : 'room:' + id + '-' + socket.id;
      if (!socket.rooms[roomId]) {
        socket.join(roomId);
        io.sockets.connected[id].join(roomId);

        io.to(id).emit('chat-private-client', { roomId, roomName: socket.nick });
        socket.emit('chat-private-client', { roomId, roomName: user });
      }
    });
  });
});

http.listen(PORT, () => {
  console.log("PORT: " + PORT);
});