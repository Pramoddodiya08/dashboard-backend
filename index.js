const mongoose = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const contact = require("./routes/contact");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors("*"));

app.use("/contact", contact);
app.use("/", signup);
app.use("/profile", profile);

app.listen(8080, () => {
  console.log("listen at 8080");
});
