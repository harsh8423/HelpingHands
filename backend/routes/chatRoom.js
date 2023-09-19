const express = require("express");
const router = express.Router();
const userRegistration = require("../models/UserSchema");
const chats = require("../models/ChatSchema");

router.post("/getmessages", async (req, res) => {
  console.log("got request");
  const { id, userID } = req.body;
  var got = false;
  try {
    
    const data = await userRegistration
      .findById(id)
      .populate("conversations.chatID");
    const user2Data = await userRegistration
      .findById(userID)
      .populate("conversations.chatID");
    if (user2Data) {
      const conversation = data.conversations;
      if (conversation[0]) {
        console.log("conversations true");
        conversation.map(async (convo) => {
          if (convo.userID === userID) {
            got = true;
          }
        });
        if (got) {
          console.log("got the user id");
          var conversations = data.conversations;
          res.json({ success: true, conversations });
        } else {
          console.log("new chat creating");
          const newChat = new chats({
            members: [
              {
                memberID: id,
              },
              {
                memberID: userID,
              },
            ],
            convoType: "single",
            name: user2Data.personalInfo[0].name,
          });
          const savedChat = await newChat.save();
          const convon = {
            convoType: "single",
            chatID: savedChat._id,
            userID: userID,
            name: user2Data.personalInfo[0].name,
          };
          data.conversations.push(convon);
          await data.save();

          const convon2 = {
            convoType: "single",
            chatID: savedChat._id,
            userID: id,
            name: data.personalInfo[0].name,
          };

          if (user2Data) {
            if (user2Data.conversations[0]) {
              user2Data.conversations.push(convon2);
            } else {
              user2Data.conversations = convon2;
            }
            await user2Data.save();
          }
          const conversations = data.conversations;
          res.json({ success: true, conversations });
        }
      } else {
        console.log("no conversations");
        console.log("new chat creating");
        const newChat = new chats({
          members: [
            {
              memberID: id,
            },
            {
              memberID: userID,
            },
          ],
          convoType: "single",
        });
        const savedChat = await newChat.save();
        const convon = {
          convoType: "single",
          chatID: savedChat._id,
          userID: userID,
          name: user2Data.personalInfo[0].name,
        };
        data.conversations = convon;
        await data.save();

        try {
          if (user2Data) {
            const convon2 = {
              convoType: "single",
              chatID: savedChat._id,
              userID: id,
              name: data.personalInfo[0].name,
            };
            if (user2Data.conversations[0]) {
              user2Data.conversations.push(convon2);
            } else {
              user2Data.conversations = convon2;
            }
            await user2Data.save();
          }
        } catch (err) {
          console.log(err);
        }
        const d = await userRegistration
          .findById(id)
          .populate("conversations.chatID");
        const conversations = d.conversations;
        res.json({ success: true, conversations });
      }
    } else {
      var conversations = data.conversations;
      res.json({ success: true, conversations });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendMessage", async (req, res) => {
  console.log("got the message");
  const { message, senderID, chatID, recieverID } = req.body;
  console.log("chat id you are searching for", recieverID);
  try {
    const chatData = await chats.findById(chatID);
    if (chatData) {
      const messageX = {
        senderID: senderID,
        message: message,
        dateStamp: Date.now(),
      };
      chatData.messages.push(messageX);

      await chatData.save();
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const user = await userRegistration.findOneAndUpdate(
      {
        _id: senderID,
        "conversations.chatID": chatID,
      },

      {
        $set: {
          "conversations.$.notification": {
            senderID: senderID,
            message: message,
            dateStamp: Date.now(),
            seen: true,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      console.log("User or conversation not found.");
      res.json({ success: false });
    }

    const user2 = await userRegistration.findOneAndUpdate(
      {
        _id: recieverID,
        "conversations.chatID": chatID,
      },
      {
        $set: {
          "conversations.$.notification": {
            senderID: senderID,
            message: message,
            dateStamp: Date.now(),
            seen: false,
          },
        },
        $inc: {
          "conversations.$.notificationCount": 1,
        },
      },
      { new: true }
    );

    const userdata = await userRegistration
      .findById(senderID)
      .populate("conversations.chatID");
    const conversations = userdata.conversations;
    res.json({ success: true, conversations });

    if (!user2) {
      console.log("User2 or conversation not found.");
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error adding notification:", error);
  }
});



router.post("/markAsRead", async (req, res) => {
  console.log("mark as read function entered");

  const { senderId, chatId, recieverId } = req.body;
  console.log("chat id you are searching for", recieverId);

  try {
    const user = await userRegistration.findOneAndUpdate(
      {
        _id: senderId,
        "conversations.chatID": chatId,
      },
      {
        $set: {
          "conversations.$.notificationCount": 0,
        },
      },
      { new: true }
    );
    
    
    if (!user) {
      console.log("User or conversation not found.");
      res.json({ success: false });
    }
    const conversations = user.conversations;
    res.json({ success: true, conversations });

    // const user2 = await userRegistration.findOneAndUpdate(
    //   {
    //     _id: recieverId,
    //     "conversations.chatID": chatId,
    //   },
    //   {
    //     $set: {
    //       "conversations.$.notificationCount": 0,
    //     },
    //   },
    //   { new: true }
    // );

    // if (!user2) {
    //   console.log("User2 or conversation not found.");
    //   res.json({ success: false });
    // }
  } catch (error) {
    console.error("Error adding notification:", error);
  }
});

module.exports = router;
