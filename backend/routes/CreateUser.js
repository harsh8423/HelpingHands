const express = require("express");
const router = express.Router();
const userRegistration = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "f23gfc434cg3fc4g23c24g2fcg3fc4egrbjyx34qpzxv";
router.post(
    "/CreateUser",
    [
      body("email", "invalid email").isEmail(),
      body("name", "enter a valid name").isLength({ min: 3 }),
      body("password", "password should have minimum 5 charachters").isLength({
        min: 5,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      try {
        const newUser = new userRegistration({
          personalInfo:[
            {
              name: req.body.name,
              email: req.body.email,
              password: secpassword,
              educationLevel:req.body.educationLevel,
              gender:req.body.gender
  
              // Add other properties as needed
            }],
          skills:req.body.skills,
          details: {portfolioWebsiteURL:"", resumeFile:""}
          
        });
  
        // Save the new user document
        await newUser
          .save()
          .then((result) => {
            console.log("User created:", result);
            res.json({ success: true });
            // Handle success
          })
          .catch((error) => {
            console.error("Error creating user:", error);
            // Handle error
            res.json({ success: false });

          });
      } catch (err) {
        console.log(err);
        res.json({ status: err });
      }
    }
  );
  
  router.post("/LoginUser", async (req, res) => {
    try {
      let email = req.body.email;
      const userData = await userRegistration.findOne({
        "personalInfo.email": email,
      })
  
        console.log(userData)
      if (!userData) {
        return res.status(400).json({ errors: "email or password wrong" });
      }
      pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.personalInfo[0].password
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: "email or password wrong" });
      }
      const data = {
        user: {
          id: userData._id,
        },
      };
      const authToken = jwt.sign(data, secret);
      return res.json({ success: true, authToken,userData });
    } catch (error) {
      console.error("Error creating student:", error);
      // Handle error
    }
  });

  router.post("/MobileLogin", async (req, res) => {
    try {
      const userData = await userRegistration.findOne({
        "personalInfo.mobileNumber": req.body.mobileNumber,
      })
  
        console.log(userData)
      if (!userData) {
        return res.status(400).json({ errors: "wrong Mobile Number" });
      }
      const data = {
        user: {
          id: userData._id,
        },
      };
      const authToken = jwt.sign(data, secret);
      return res.json({ success: true, authToken,userData });
    } catch (error) {
      console.error("Error in login", error);
      // Handle error
    }
  });

  router.post("/profileView", async (req, res) => {
    try {
      console.log("object")
      const id = req.body.id
      const userData = await userRegistration.findById(id)
  
      if (!userData) {
        return res.status(400).json({success:false, errors: "wrong user" });
      }
      if(userData){

        return res.json({ success: true, userData });
      }
      
    } catch (error) {
      console.error("Error in login", error);
      // Handle error
    }
  });
  module.exports = router;
  