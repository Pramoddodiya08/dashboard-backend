const express = require("express");
const signup = require("../models/signup");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = "secretKey";
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  let signupData = new signup({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const data = await signupData.save();
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: data,
  });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // if (!username || !password) {
    //   return res
    //     .status(400)
    //     .json({ message: "Username and password are required" });
    // }

    const user = await signup.findOne({ username: username });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    if (user.password === password) {
      jwt.sign({ user }, secretKey, (err, token) => {
        return res.status(200).json({
          success: true,
          message: "User Login successfully",
          data: user,
          token: token,
        });
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// router.post("/profile", async (req, res) => {
//   try {
//     const user = await signup.findOne({ username: req.body.username });
//     return res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
