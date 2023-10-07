// Import required modules
const express = require("express");
const mongooseConnection = require("./models/MoongooseConnection");
const app = express();
const cors = require("cors");
// const io = require("socket.io")(8080, {
//   cors: {
//     origin: "http://localhost:3000", // Allow connections from this origin
//   },
// });

// // Array to store online users
// let onlineUsers = [];

// // Socket.IO connection event
// io.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   // Event to add a new user to the onlineUsers array
//   socket.on("addNewUser", (userID) => {
//     const isUserExist = onlineUsers.find((user) => user.userID === userID);
//     if (!isUserExist) {
//       onlineUsers.push({
//         userID,
//         socketId: socket.id,
//       });
//     }
//     // Emit the updated list of online users to all connected clients
//     io.emit("getOnlineUsers", onlineUsers);
//     console.log("onlineUsers", onlineUsers);
//   });

//   // Event to send a message
//   socket.on("sendMessage", async ({ senderID, receiverID, message }) => {
//     console.log("received request to send the message");
//     const receiver = await onlineUsers.find((user) => user.userID === receiverID);
//     const sender = await onlineUsers.find((user) => user.userID == senderID);
//     if (receiver) {
//       io.to(receiver.socketId).to(sender.socketId).emit("getMessage", {
//         senderID,
//         message,
//         dateStamp: Date.now(),
//       });
//     } else {
//       io.to(sender.socketId).emit("getMessage", {
//         senderID,
//         message,
//         dateStamp: Date.now(),
//       });
//     }
//   });

//   // Event to send a notification
//   socket.on("sendNotification", async ({ receiverID, senderID, message, notificationCount }) => {
//     console.log("received request to send the notification");
//     const receiver = await onlineUsers.find((user) => user.userID === receiverID);
//     if (receiver) {
//       io.to(receiver.socketId).emit("getNotification", {
//         senderID,
//         message,
//         dateStamp: Date.now(),
//       });
//     }
//   });

//   // Event for user disconnect
//   socket.on("disconnect", () => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
//     console.log("onlineUsers", onlineUsers);

//     // Emit the updated list of online users to all connected clients
//     io.emit("getOnlineUsers", onlineUsers);
//   });
// });

// Set up CORS middleware
const allowedOrigins = [
  "https://helping-hands-two.vercel.app",
  "http://localhost:3000",
  // Add more origins as needed
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Parse JSON requests
app.use(express.json());

// Define API routes
app.use("/api", require("./routes/PostProject"));
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/FileUpload"));
app.use("/api", require("./routes/ProfileUploads"));
app.use("/api", require("./routes/PhoneVerify"));
app.use("/api", require("./routes/MyContracts"));
app.use("/api", require("./routes/Filter"));
app.use("/api", require("./routes/Connects"));
app.use("/api", require("./routes/chatRoom"));
app.use("/api", require("./routes/teamRoutes"));
app.use("/api", require("./routes/transactions"));
app.use("/api", require("./routes/bugs"));

// Define a test route
app.get("/", async (req, res) => {
  res.send("harsh");
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
