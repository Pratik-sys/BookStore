const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server started & Running at ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Testing!");
});
