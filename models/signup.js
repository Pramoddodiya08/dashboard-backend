const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String },
  address: { type: String },
  designation: { type: String },
  goal: { type: String },
});

const signup = mongoose.model("Signup", signupSchema);

module.exports = signup;
