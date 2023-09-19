const express = require("express");
const router = express.Router();
const projects = require("../models/projectsSchema");

router.post("/filterProject", async (req, res) => {
    try {
      const query = req.body.query;
      const budge =query.budget;

      if(budge){
        if (budge ==="5000") {
            query.budget = { $gte: "1001", $lte: "5000" };
          } else if (budge ==="10000") {
              query.budget = { $gte: "5001", $lte: "10000" };
            } else if (budge ==="1000") {
                query.budget = { $lte: "1000" };
            }else{
              query.budget = { $gte: "10000" };
          }
      }

      const data = await projects.find(query);
      if(data){
          res.json({ success: true,data });
          console.log(data)
      }else{
        res.json({ success: false });
      }

    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = router;
  