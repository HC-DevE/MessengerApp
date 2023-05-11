const express = require("express");
const router = express.Router();
let io;
function initSocketIO(server) {
  io = require("socket.io")(server);
  registerSocketEvents();
}
const {
  formatMessage,
  formatFileMessage,
} = require("./services//utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  addRoomMessage,
  getRoomMessages,
  roomsNames,
} = require("./services/utils/users");
const chatController = require("./controllers/chatController");

// Routes
router.get("/home", (req, res) => {
  res.render("chat-home", { roomsNames });
});

router.get("/room", chatController.getRoom);

router.post("/room", chatController.postRoom);

//coming soon
// //return a list of all available chat rooms.
// router.get("/rooms", (req, res) => {
//   const rooms = getAllRooms();
//   res.json(rooms);
// });

// router.get("/rooms/:room/messages", (req, res) => {
//   //return a list of all messages in a specific room.
//   const roomMessages = getRoomMessages(req.params.room);
//   res.json(roomMessages);
// });

// router.post("/rooms/:room/messages", (req, res) => {
//   //handle adding a new message to a room.
//   const { username, message } = req.body;
//   const newMessage = addRoomMessage(req.params.room, { username, message });
//   res.json(newMessage);
// });

function registerSocketEvents() {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);

      // Send room chat history to the new user
      const roomMessages = getRoomMessages(user.room);
      roomMessages.forEach((message) => {
        socket.emit("message", message);
      });

      // Welcome message
      socket.emit("message", formatMessage("Server", "Welcome to the chat!"));

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage("Server", `${user.username} has joined the chat`)
        );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // Listen for chat messages
    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);
      const message = formatMessage(user.username, msg, user.color);
      addRoomMessage(user.room, message); // Store the message in the room
      io.to(user.room).emit("message", message);
    });

    //when user is typing indicator
    socket.on("typing", (user) => {
      socket.broadcast.to(user.room).emit("typing", user.username);
    });

    //file handler
    socket.on("fileMessage", (fileData) => {
      const user = getCurrentUser(socket.id);
      io.to(fileData.room).emit(
        "fileMessage",
        formatFileMessage(
          fileData.username,
          fileData.data,
          fileData.fileName,
          user.color
        )
      );
    });

    // When a user disconnects
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("Server", `${user.username} has left the chat`)
        );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
}

module.exports = { router, initSocketIO };
