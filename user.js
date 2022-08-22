let users = [];

exports.addUser = ({ id, name, room }) => {
  if (!name || !room) return { error: "Name and Room are required." };
  const user = { id, name, room };

  users.push(user);

  return { user };
};

exports.getUsers = (room) => {
  return users.filter((user) => user.room === room);
};

exports.leaveRoom = (id, room) => {
  const index = users.findIndex((user) => user.id === id && user.room === room);
  return users.splice(index, 1)[0];
};

exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return users.splice(index, 1)[0];
};
