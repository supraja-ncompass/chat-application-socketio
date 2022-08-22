const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const { addUser, removeUser, getUsers } = require("./user");

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);

    io.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} just left the room`,
    });
  });

  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
    socket.emit("message", {
      user: "Admin",
      text: `Welcome to ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Admin", text: `${user.name} has joined!` });

    socket.to(user.room).emit("online-users", getUsers(user.room));
    callback(null);

    socket.on("sendMessage", ({ message }) => {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    });

    io.to(user.room).emit("online-users", getUsers(users[user.room]));
  });

  socket.on("typing", ({room, name}) => {
    socket.broadcast.to(room).emit("typing", name);
  });
});

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`));
