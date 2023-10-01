const express = require("express");
const router = express.Router();
const bugs = require("../models/bugSchema");

router.post("/gotbug", async (req, res) => {
    try {
        const {id, name, email, location, detail} = req.body;

        const newbug = new bugs({
            id: id,
            name:name,
            detail:detail,
            dateStamp: Date.now(),
            location:location,
            email: email
          });
        await newbug.save();
        res.json({ success:true});
          
        }catch (err) {
        console.log(err)
          res.json({ success:false});
      }
});


module.exports = router;
