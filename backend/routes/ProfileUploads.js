const express = require("express");
const router = express.Router();
const userRegistration = require("../models/UserSchema");

router.post("/portfolioWebsiteURL", async (req, res) => {
  try {
    const id =req.body.id 
    const url = req.body.portfolioWebsiteURL
    const userData = await userRegistration.findById(id)
    userData.details.portfolioWebsiteURL= url
    // Save the new user document
    await userData
      .save()
      .then((result) => {
        console.log("User created:", result);
        // Handle success
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        // Handle error
      });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.post("/postProject", async (req, res) => {
  try {
    const id =req.body.id 
  
    const userData = await userRegistration.findById(id)
    
    const data = {
      title: req.body.title,
      completionDate:req.body.completionDate,
      description: req.body.description,
      projectLink: req.body.projectLink,
      skills: req.body.skills
    }
    if(userData){
      userData.projects.push(data)
      await userData
        .save()
        .then((result) => {
          console.log("User created:", result);
          res.json({ success: true });
          // Handle success
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          res.json({ success: false });
          // Handle error
        });
    }
    
  } catch (err) {
    console.log(err);
  }
});

router.post("/postBio", async (req, res) => {
  try {
    const id =req.body.id 
    const title =req.body.title;
    const bio = req.body.bio
  
    const userData = await userRegistration.findById(id)
    
    if(userData){
      if(title){
        userData.personalInfo[0].title= req.body.title ;
      }
      if(bio){
        userData.personalInfo[0].bio= req.body.bio ;
      }

        await userData
        .save()
        .then(() => {
          res.json({ success: true });
        })
        .catch((error) => {
          res.json({ success: false });
        });
    }
    
  } catch (err) {
    console.log(err);
  }
});


router.post("/postCertificate", async (req, res) => {
  try {
    const id =req.body.id 
  
    const userData = await userRegistration.findById(id)
    
    const data = {
      title: req.body.title,
      completionDate:req.body.completionDate,
      description: req.body.description,
      link: req.bodylink,
      certificationID: req.body.certificationID,
      provider: req.body.provider
    }
    if(userData){
      userData.certifications.push(data)
      await userData
        .save()
        .then((result) => {
          console.log("User created:", result);
          res.json({ success: true });
          // Handle success
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          res.json({ success: false });
          // Handle error
        });
    }
    
  } catch (err) {
    console.log(err);
  }
});

router.post("/postAchievement", async (req, res) => {
  try {
    const id =req.body.id 
  
    const userData = await userRegistration.findById(id)
    
    const data = {
      title: req.body.title,
      completionDate:req.body.completionDate,
      description: req.body.description,
    }
    if(userData){
      userData.achievements.push(data)
      await userData
        .save()
        .then((result) => {
          console.log("User created:", result);
          res.json({ success: true });
          // Handle success
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          res.json({ success: false });
          // Handle error
        });
    }
    
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
