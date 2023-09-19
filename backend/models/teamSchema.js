const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new mongoose.Schema({
  teamName: { type: String },
  moto: { type: String },
  projects:[{
    title:{ type: String },
    description:{ type: String },
    dateStamp:{ type: Date },
    completionDate:{ type: Date },
    membersName:[{ type: String },]
  }],
  members: [{ type: Schema.Types.ObjectId, ref: "users" }],
  teamLeader: { type: Schema.Types.ObjectId, ref: "users" },
  temporaryMembers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  activeProjects: [{ type: Schema.Types.ObjectId, ref: "projects" }],
  chatID: { type: Schema.Types.ObjectId, ref: "chats" },
  requests:[{ type: Schema.Types.ObjectId, ref: "users" }],
  teamBulletin:[{
    messageType:{type: String},
    sender:{type: String},
    message:{type: String},
    dateStamp:{type: String}
  }]
});
const teams = mongoose.model("teams", teamSchema);
module.exports = teams;
