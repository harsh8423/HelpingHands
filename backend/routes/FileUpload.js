const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRegistration = require("../models/UserSchema");

// require("../../frontend/src/uploads")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/screens/Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  const resumeFile = req.file.filename;
  console.log(resumeFile)

  try {
    const id =req.body.id
    console.log(id)
    const userData = await userRegistration.findById(id)
    if(userData){
      userData.details.resumeFile= `${resumeFile}`
      // Save the new user document
      await userData
        .save()
        .then((result) => {
          console.log("User created:", result);
          res.status(200).json({ success: true });
          // Handle success
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          // Handle error
          res.json({ success: false });

        });

    }
  } catch (error) {
    res.json({ status: error });
  }
})
module.exports= router