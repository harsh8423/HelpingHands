const mongoose = require("mongoose");
const { Schema } = mongoose;

const bugSchema = new mongoose.Schema({
    id:{type: Schema.Types.ObjectId, ref: "users"},
    name:{type:String},
    email: { type: String },
    location:{type:String},
    detail:{type:String},
    dateStamp:{type:Date},
});
const bugs = mongoose.model("bugs", bugSchema);
module.exports = bugs;