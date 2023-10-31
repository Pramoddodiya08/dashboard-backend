const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  mobile: { type: String },
  address: { type: String },
  designation: { type: String },
  goal: { type: String },
});

const profile = mongoose.model("Profile", profileSchema);

module.exports = profile;
