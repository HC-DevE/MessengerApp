const users = [];
const rooms = {
  General: { users: [], messages: [] },
  News: { users: [], messages: [] },
  Coding: { users: [], messages: [] },
  Sports: { users: [], messages: [] },
};
const roomsNames = Object.keys(rooms);

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room, color: randomColor() };
  users.push(user);
  return user;
}

// Get the current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

// Add utility functions to manage room messages
function addRoomMessage(room, message) {
  if (rooms[room]) {
    rooms[room].messages.push(message);
  }
}

function getRoomMessages(room) {
  if (rooms[room]) {
    return rooms[room].messages;
  }
  return [];
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  addRoomMessage,
  getRoomMessages,
  randomColor,
  roomsNames,
};