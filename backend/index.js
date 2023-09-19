const express = require("express");
const mongooseConnection = require("./models/MoongooseConnection");
const app = express();
const cors = require("cors");
const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("addNewUser", (userID) => {
    const isUserExist = onlineUsers.find((user) => user.userID === userID);
    if (!isUserExist) {
      onlineUsers.push({
        userID,
        socketId: socket.id,
      });

    }
    io.emit("getOnlineUsers", onlineUsers);
    console.log("onlineUsers", onlineUsers);
  });


  socket.on("sendMessage", async ({ senderID, receiverID, message }) => {
    console.log("recieved request to send the message")
    const receiver = await onlineUsers.find((user) => user.userID === receiverID);
    const sender = await onlineUsers.find((user) => user.userID == senderID);
    if (receiver) {
      // console.log("sending to reciver")
      // console.log("sender",sender)
      // console.log("reciver",receiver)
      // console.log("object")
      io.to(receiver.socketId).to(sender.socketId).emit("getMessage", {
        senderID,
        message,
        dateStamp: Date.now(),
      });

    } else {
      console.log("sending failed to reciver")
      io.to(sender.socketId).emit("getMessage", {
        senderID,
        message,
        dateStamp: Date.now(),

      });
    }
  });


  socket.on("sendNotification", async ({receiverID,senderID, message,notificationCount }) => {
    console.log("recieved request to send the notification")
    const receiver = await onlineUsers.find((user) => user.userID === receiverID);
    if (receiver) {
      console.log("sending to reciver")
      console.log("reciver",receiver)
      io.to(receiver.socketId).emit("getNotification", {
        senderID,
        message,
        dateStamp: Date.now(),
      });
    }
    
    })

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("onlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Only allow specified HTTP methods
  })
);

app.use(express.json());

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

app.get("/", async (req, res) => {
  res.send("harsh");
});

app.listen(5000, () => {
  console.log(" listening to the port at 5000");
});
