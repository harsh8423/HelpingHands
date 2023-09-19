const express = require("express");
const router = express.Router();
const teams = require("../models/teamSchema");
const chats = require("../models/ChatSchema");
const userRegistration = require("../models/UserSchema");

router.post("/createTeam", async (req, res) => {
    const {id,teamName, moto}= req.body
    try {
      const newChat = new chats({
        members: [{id}],
        convoType: "team",
      });
      const savedChat = await newChat.save();

        console.log("data recived")
        const newUser = new teams({
            teamName: teamName,
            moto:moto,
            teamLeader: id,
            chatID: savedChat._id

        });
        const savedTeam= await newUser.save()
        var team = {
          teamName: teamName,
          teamID: savedTeam._id
        }

        const userData = await userRegistration.findById(id)
        userData.team= team
        userData.save()
          .then((result) => {
            console.log("team created", result);
            res.json({ success: true });
          })
          .catch((error) => {
            console.error("Error creating team:", error);
            res.json({ success: false });
          });
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });


  router.post("/addtoteam", async (req, res) => {
    const {id,teamID}= req.body
    console.log(teamID)

    try {
        const team1 = await teams.findById(teamID)
        console.log(team1)
        team1.requests.push(id)
        team1.save()
          .then(() => {
            res.json({ success: true });
          })
          .catch((error) => {
            console.error("Error creating team:", error);
            res.json({ success: false });
          });
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });

  router.post("/getTeamRequests", async (req, res) => {
    const {id}= req.body
    try {
        const user = await userRegistration.findById(id)
        if(user){

          console.log(user.teamRequests)
          var team = user.teamRequests
          res.json({ success: true, team });

        }else{
          res.json({ success: false });

        }
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });

  router.post("/approveRequest", async (req, res) => {
    const {id, teamID}= req.body
    try {
        const team = await teams.findByIdAndUpdate(
          teamID,
            { $pull: { requests: id } },
            { new: true }
        )
        const user = await userRegistration.findByIdAndUpdate(id)
        if(team && user){
          const teamRequest={
            teamName:team.teamName,
            moto: team.moto,
            teamID: teamID,
            status: "requested",
          }

          const teambulletin ={
            sender: "Team Leader",
            message:`team request sent to ${user.personalInfo[0].name}`,
            dateStamp:Date.now(),

        };
        team.teamBulletin? team.teamBulletin.push(teambulletin):team.teamBulletin=teambulletin
        user.teamRequests? (user.teamRequests.push(teamRequest)):(user.teamRequests= teamRequest); 
        
        await team.save();
          await user.save().then(()=>{
            res.json({ success: true});
          })

        }else{
          res.json({ success: false });

        }
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });


  router.post("/acceptRequests", async (req, res) => {
    const {id, teamID}= req.body
    try {
        const team = await teams.findById(teamID)
        const user = await userRegistration.findByIdAndUpdate(
          id,
        { $pull: { teamRequests: { teamID: teamID }  } },
        { new: true })
        
        if(team && user){
          const teamRequest={
            teamName:team.teamName,
            moto: team.moto,
            teamID: teamID,
          }
          const teambulletin ={
            sender: user.personalInfo[0].name,
            message:"Accepted the team request. He is now a team member",
            dateStamp:Date.now(),

        };
        team.teamBulletin? team.teamBulletin.push(teambulletin):team.teamBulletin=teambulletin
        

          user.team= teamRequest; 
          team.members.push(id)

          await user.save().then(async()=>{
            await team.save().then(()=>{
              res.json({ success: true});
            })
          })

        }else{
          res.json({ success: false });

        }
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });


  router.post("/getTeamData", async (req, res) => {
    const {id}= req.body;
    console.log(id)
    try {
        const team = await teams.findById(id).populate('members')
        .populate('teamLeader')
        .populate('temporaryMembers')
        .populate('activeProjects')
        .populate('chatID')
        .populate('requests')
        console.log(team)
        if(team){
            res.json({ success: true, team});
          }
          else{
            res.json({ success: false });
          };
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });

  
  router.post("/endMessageX", async (req, res) => {
    console.log("object in backend")
    const {chatID, senderID, message}= req.body;
    console.log(chatID);
    
    try {
      const chatData = await chats.findById(chatID);
      if (chatData) {
        const messageX = {
          senderID: senderID,
          message: message,
          dateStamp: Date.now(),
        };
        chatData.messages.push(messageX);
  
        const chats= await chatData.save()
        const messages = chats.messages
        res.json({ success: true, messages});

      }else{
        res.json({ success: false});
      } 
    }
      catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });

  router.post("/CreateTeamProject", async (req, res) => {
    const {id,title,description, deadline}= req.body
    console.log(title,description,deadline)
    try {
      
      const teamData = await teams.findById(id)

        if(teamData){
          const teamProject ={
            title: title,
            description:description,
            completionDate:deadline,
            dateStamp:Date.now(),

        };
        teamData.projects? teamData.projects.push(teamProject):teamData.projects=teamProject
        }else{
          res.json({ success: false });
        }
        await teamData.save()
          .then((result) => {
            console.log("team created", result);
            res.json({ success: true });
          })
          .catch((error) => {
            console.error("Error creating team:", error);
            res.json({ success: false });
          });
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });

  router.post("/TeamBulletin", async (req, res) => {
    const {teamID, sender, message}= req.body
    try {
      
      const teamData = await teams.findById(teamID)

        if(teamData){
          const teambulletin ={
            sender: sender,
            message:message,
            dateStamp:Date.now(),

        };
        teamData.teamBulletin? teamData.teamBulletin.push(teambulletin):teamData.teamBulletin=teambulletin
        }else{
          res.json({ success: false });
        }
        await teamData.save()
          .then((result) => {
            const bulletins = teamData.teamBulletin
            console.log("team created", result);
            res.json({ success: true, bulletins });
          })
          .catch((error) => {
            console.error("Error creating team:", error);
            res.json({ success: false });
          });
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
  });

  router.post("/getBulletins", async (req, res) => {
    const {teamID}= req.body
    console.log("ueifhuihfaiusdhfidhfiushfisudfhisufh",teamID)
      const teamData = await teams.findById(teamID)
        if(teamData){
          const bulletins = teamData.teamBulletin
          res.json({ success: true, bulletins });
        }else{
          res.json({ success: false });
        }
  });

  
  module.exports = router;
  