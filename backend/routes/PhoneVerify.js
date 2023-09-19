const express = require("express");
const router = express.Router();
const userRegistration = require("../models/UserSchema");

router.post("/verifyPhone", async (req, res) => {
  try {
    let mobileNumber = req.body.phoneNumber;
    const userData = await userRegistration.findOne({
      "personalInfo.mobileNumber": mobileNumber,
    });

    console.log(userData);
    if (!userData) {
      return res.status(400).json({ success: false });
    }
    if (userData) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error finding User:", error);
    // Handle error
  }
});

router.post("/saveMobileNumber", async (req, res) => {
  try {
    const userData = await userRegistration.findOne({
      "personalInfo.email": req.body.email,
    });
    if (userData) {
      userData.personalInfo[0].mobileNumber= req.body.mobileNumber ;

      // Save the new user document
      await userData.save();

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
