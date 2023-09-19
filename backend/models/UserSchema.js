const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  teamRequests:[{
    status:{type: String},
    moto:{type: String},
    teamID:{ type: Schema.Types.ObjectId, ref: "teams" },
    teamName:{type: String},
  }],
  
  connects: [
    {
      userID: {type: Schema.Types.ObjectId, ref: "users"},
      status: {type: String},
      requestDate:{type:Date}
    }
  ],
  personalInfo:[{
      name: { type: String },
      mobileNumber: { type: Number, unique:true }, //required: [true, 'mobile number required']},
      email: { type: String,},
      password: { type: String },
      gender: { type: String},
      dob: { type: Date },
      educationLevel: { type: String },
      bio:{type: String},
      title:{type: String}
  }],
  skills: [
      { type: String },
  ],


  details:{
    resumeFile:{ type: String, default:""},
    portfolioWebsiteURL:{ type: String, default:""}  
  },
  userVerified: { type: Boolean, default:false },
  proposals: [{
    projectID:{ type: Schema.Types.ObjectId, ref: "projects" },
    status:{ type: String, enum:['accepted','ongoing','pending',"completed"] },
  }],
  projects: [
    {
      title: { type: String },
      completionDate: { type: Date },
      description: { type: String },
      projectLink: { type: String },
      skills: [
        {
          type: String,
        },
      ],
    },
  ],
  team:{
    teamName:{type: String},
    moto:{type: String},
    teamID:{ type: Schema.Types.ObjectId, ref: "teams" }
  },
  certifications: [
    {
      title: { type: String },
      provider: { type: String },
      completionDate: { type: Date },
      description: { type: String },
      link: { type: String },
      certificationID: { type: String },
    },
  ],

  conversations:[{
    convoType:{type:String},
    userID:{type:String},
      chatID:{type: Schema.Types.ObjectId, ref: "chats" },
      name:{type:String},
      notificationCount:{type:Number},
      notification:[{
        senderID:{type:String},
        message:{type:String},
        dateStamp:{type:Date},
        seen:{type: Boolean, default:false},
    }]
  }],

  profileState: [
    {
      adhaarVerified: { type: String },
      minimumProfile: { type: String },
      billingDeatailAdded: { type: String },
      
    },
  ],
    
  achievements: [
    {
      title: { type: String },
      completionDate: { type: Date },
      description: { type: String },
    },
  ],
});
const userRegistration = mongoose.model("users", UserSchema);
module.exports = userRegistration;
