const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/suryvanci", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("err", err);
  });

module.exports = mongoose;
