const express = require("express");
const app = express();
require("dotenv").config();

const config = require("./config");
app.listen(process.env.PORT, () => {
  console.log(`Server started & Running at ${process.env.PORT}`);
});

config.DBconfig();

app.get("/", (req, res) => {
  res.send("Testing!");
});
