const express = require("express");
const router = express.Router();
const projects = require("../models/projectsSchema");

router.post("/MyContracts", async (req, res) => {
  try {
    console.log("data recived")
    const id = req.body.id
    const data = await projects.find({
        "creater":id
    })
    if(data){

        res.json({ success: true,data });
    }else{
        res.json({ success:false });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: err });
  }
});

router.get("/contracts", async (req, res) => {
  try {
    console.log("data recived")
    const data = await projects.find({})
    if(data){

        res.json({ success: true,data });
    }else{
        res.json({ success:false });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: err });
  }
});

router.post("/proposals", async (req, res) => {
  try {
    console.log("data recived")
    const id = req.body.id
    const data = await projects.findById(id).populate('proposals.proposalID')
    if(data){
      const proposals = data.proposals
        res.json({ success: true, proposals });
    }else{
        res.json({ success:false });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: err });
  }
});

module.exports = router;
