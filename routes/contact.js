const express = require("express");
const contact = require("../models/contact");
const router = express.Router();

router.post("/", async (req, res) => {
  let cont = new contact({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    notes: req.body.notes,
    dob: req.body.dob,
    contact: req.body.contact,
    status: req.body.status,
  });
  const data = await cont.save();

  return res.json(data);
});
router.delete("/:id", async (req, res) => {
  const d = await contact.findOneAndDelete({ _id: req.params.id });
  return res.json({ success: true, data: d });
});

router.put("/:id", async (req, res) => {
  const d = await contact.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  return res.json({ success: true, data: d });
});

router.get("/", async (req, res) => {
  try {
    if (req.query.page != undefined) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      const skip = (page - 1) * limit;

      const contacts = await contact.find({}).skip(skip).limit(limit);

      const totalContacts = await contact.countDocuments();

      return res.json({
        success: true,
        data: contacts,
        pagination: {
          total: totalContacts,
          page,
          limit,
          pages: Math.ceil(totalContacts / limit),
        },
      });
    } else {
      const data = await contact.find();
      return res.json({ success: true, data: data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});
module.exports = router;
