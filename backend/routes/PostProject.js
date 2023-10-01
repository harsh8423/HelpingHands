const express = require("express");
const router = express.Router();
const projects = require("../models/projectsSchema");
const userRegistration = require("../models/UserSchema");


router.post("/PostProject", async (req, res) => {
  try {
    console.log("data recived")
    const newUser = new projects({
        creater: req.body.creater,
        title: req.body.title,
        description: req.body.description,
        proposalType: req.body.proposalType,
        projectLength: req.body.projectLength,
        expLevel: req.body.expLevel,
        projectDuration: req.body.projectDuration,
        projectType: req.body.projectType,
        budget: req.body.budget,
        skills: req.body.skills,
        uploadDate:Date.now()
    });

    // Save the new user document
    await newUser
      .save()
      .then((result) => {
        console.log("projec posted:", result);
        res.json({ success: true });
        // Handle success
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        // Handle error
        res.json({ success: false });
      });
  } catch (err) {
    console.log(err);
    res.json({ status: err });
  }
});

router.post("/ProjectProposal", async (req, res) => {
  try {
    console.log("data recived")
    const id = req.body.id
    const userID = req.body.proposalID
    const data = await projects.findById(id)
    if(data){
      const proposalDetail = {
        proposalID:userID,
        proposalDate: Date.now(),
        budget:req.body.budget,
        coverLetter: req.body.coverLetter,
        status:"pending"
      }
      data.requests? data.requests.push(userID):data.requests=userID
      data.proposals.push(proposalDetail) ;

      // Save the new user document
      await data.save();
    }else{
        res.json({ success:false });
    }
    const user = await userRegistration.findById(userID)
    if(user){
      const proposal = {
        projectID:id,
        status: 'pending',
      }
      user.proposals? user.proposals.push(proposal):user.proposals= proposal
      await user.save();
      res.json({ success:true });

    }else{
        res.json({ success:false });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: err });
  }
});

router.post("/JobConfirmLetter", async (req, res) => {
  try {
    console.log("data recived")
    const {id,projectID,coverLetter,budget} = req.body
    console.log(id)
    console.log(projectID)
    const data = await projects.findOne({
      creater:projectID})
    console.log(data)
      data.proposals.map(async(proposal)=>{
        if(proposal.proposalID==id){
             console.log("found")
          const proposalDetail = {
            dateStamp: Date.now(),
            budget:budget,
            letter: coverLetter,
            status:"pending"
          }

          proposal.status='accepted'
          proposal.confirmation =proposalDetail ;
          await data.save();
          res.json({ success:true });
        }
      })
  } catch (err) {
    console.log(err);
    // res.json({ status: err });
  }
});



module.exports = router;
