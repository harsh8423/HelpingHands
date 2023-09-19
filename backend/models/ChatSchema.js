const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema({
    convoType:{type:String},
    members:[{
        memberID: { type: Schema.Types.ObjectId, ref: "users" },
    }],
    messages:[{
        senderID:{type:String},
        message:{type:String},
        dateStamp:{type:Date},
    }]
});
const chats = mongoose.model("chats", chatSchema);
module.exports = chats;