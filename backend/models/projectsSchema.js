const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new mongoose.Schema({
    creater: { type: Schema.Types.ObjectId, ref: "users" },
    requests: [{ type: Schema.Types.ObjectId, ref: "users" }],
    projectType:{type: String},
    title:{type: String},
    description: { type: String },
    budget: { type: Number },
    projectLength: { type: String },
    expLevel: { type: String },
    proposalType:{ type: String },
    projectDuration:{ type: String },
    uploadDate:{type: String},
    skills: [
        { type: String },
    ],
    proposals:[{
        proposalDate: { type: Date },
        budget: { type: Number },
        proposalID:{ type: Schema.Types.ObjectId, ref: "users" },
        coverLetter:{ type: String },
        status:{ type: String, enum:['accepted','ongoing','pending',"completed"] },
        confirmation:{
            letter:{ type: String },
            dateStamp:{ type: Date },
            budget:{ type: Number },
            status:{ type: String },
        }
    }]
});
const projects = mongoose.model("projects", projectSchema);
module.exports = projects;
