const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5001",
  },
});

const { addUser, removeUser, getUsers } = require("./user");
const formatMessage = (user, text) => {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  return {
    user,
    text,
    time,
  };
};

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    io.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} just left the room`,
    });

    io.to(user.room).emit("online-users", getUsers(user.room));
  });

  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
    socket.emit("message", formatMessage("Admin", `Welcome to ${user.room}`));

    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage("Admin", `${user.name} has joined!`));

    io.to(user.room).emit("online-users", getUsers(user.room));

    socket.on("sendMessage", (message) => {
      io.to(user.room).emit("message", formatMessage(user.name, message));
    });
  });
});

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`));
