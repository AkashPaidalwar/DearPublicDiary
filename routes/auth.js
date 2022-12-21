const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("req.body.profilePic = " + req.body.profilePic);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic: req.body.profilePic,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({
        message: "Wrong Username",
      });
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(404).json("Wrong Credentials");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
