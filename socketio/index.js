const cors = require("cors");
const io = require("socket.io")(8080, {
  cors: {
    origin: "https://helping-hands-two.vercel.app", // Allow connections from this origin
  },
});

// Array to store online users
let onlineUsers = [];

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Event to add a new user to the onlineUsers array
  socket.on("addNewUser", (userID) => {
    const isUserExist = onlineUsers.find((user) => user.userID === userID);
    if (!isUserExist) {
      onlineUsers.push({
        userID,
        socketId: socket.id,
      });
    }
    // Emit the updated list of online users to all connected clients
    io.emit("getOnlineUsers", onlineUsers);
    console.log("onlineUsers", onlineUsers);
  });

  // Event to send a message
  socket.on("sendMessage", async ({ senderID, receiverID, message }) => {
    console.log("received request to send the message");
    const receiver = await onlineUsers.find((user) => user.userID === receiverID);
    const sender = await onlineUsers.find((user) => user.userID == senderID);
    if (receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit("getMessage", {
        senderID,
        message,
        dateStamp: Date.now(),
      });
    } else {
      io.to(sender.socketId).emit("getMessage", {
        senderID,
        message,
        dateStamp: Date.now(),
      });
    }
  });

  // Event to send a notification
  socket.on("sendNotification", async ({ receiverID, senderID, message, notificationCount }) => {
    console.log("received request to send the notification");
    const receiver = await onlineUsers.find((user) => user.userID === receiverID);
    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        senderID,
        message,
        dateStamp: Date.now(),
      });
    }
  });

  // Event for user disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("onlineUsers", onlineUsers);

    // Emit the updated list of online users to all connected clients
    io.emit("getOnlineUsers", onlineUsers);
  });
});
