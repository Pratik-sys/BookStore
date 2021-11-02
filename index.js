const express = require("express");
const app = express();
require("dotenv").config();
const User = require("./routes");

const config = require("./config");
app.listen(process.env.PORT, () => {
  console.log(`Server started & Running at ${process.env.PORT}`);
});

config.DBconfig();
app.use(express.json());

app.use("/", User.UserRoutes);
