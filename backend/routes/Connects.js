const express = require("express");
const router = express.Router();
const userRegistration = require("../models/UserSchema");

router.post("/connectRequest", async (req, res) => {
  console.log("got request");
  const id = req.body.id;
  const userID = req.body.userID;
  try {
    const data = await userRegistration.findById(id);
    if (data) {
      const connect = {
        userID: userID,
        requestDate: Date.now(),
        status: "requested",
      };
      data.connects.push(connect);

      // Save the new user document
      await data.save();
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const userData = await userRegistration.findById(userID);
    if (userData) {
      const connectx = {
        userID: id,
        requestDate: Date.now(),
        status: "request",
      };
      userData.connects.push(connectx);

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

router.post("/Myconnect", async (req, res) => {
  console.log("got request");
  const id = req.body.id;
  try {
    const data = await userRegistration
      .findById(id)
      .populate("connects.userID");
    if (data) {
      const userData = data.connects;
      res.json({ success: true, userData });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/Acceptconnect", async (req, res) => {
  console.log("gotrequest");
  const id = req.body.id;
  const userID = req.body.userID;
  try {
    const data = await userRegistration.findOne({
      "connects.userID": id,
    });
    if (data) {
      console.log(data);

      data.connects.map((connect) => {
        if (connect.userID == id) {
          connect.status = "accepted";
        } else {
          console.log("object");
        }
      });

      // Save the new user document
      await data.save();
      // res.json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const userdata = await userRegistration.findById(id);
    if (userdata) {
      console.log(userdata);
      userdata.connects.map((connect) => {
        if (connect.userID == userID) {
          connect.status = "accepted";
        } else {
          console.log("nothing");
        }
      });
      await userdata.save();

      // Save the new user document
      const con = await userRegistration
        .findById(id)
        .populate("connects.userID");
      const connect = con.connects;
      res.json({ success: true, connect });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
