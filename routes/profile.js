const express = require("express");
const profile = require("../models/profile");
const signup = require("../models/signup");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const signupUser = await signup.findOne({ username });
    if (!signupUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in signup ",
      });
    }
    const existingProfile = await profile.findOne({ _id: signupUser._id });
    if (existingProfile) {
      return res.status(200).json({ success: true, data: existingProfile });
    }
    const profileUser = new profile({
      _id: signupUser._id,
      username: signupUser.username,
      email: signupUser.email,
    });
    const savedProfileUser = await profileUser.save();
    return res.status(200).json({ success: true, data: savedProfileUser });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const profileId = req.params.id;
    const newEmail = req.body.email;

    const signupDoc = await signup.findOne({ _id: profileId });

    if (signupDoc) {
      signupDoc.email = newEmail;
      await signupDoc.save();
    }

    const d = await profile.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    return res.json({
      success: true,
      data: d,
      message: "Data Update Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
