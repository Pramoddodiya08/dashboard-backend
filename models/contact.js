const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  address: { type: String },
  notes: { type: String },
  dob: { type: Date },
  contact: { type: String, required: true },
  status: { type: String },
});

const contact = mongoose.model("Contact", contactSchema);

module.exports = contact;
