const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();

const User = require("./routes");
const Book = require("./routes");
const config = require("./config");
const { Passport } = require("./config/passport");

// load configs and init the functions
config.DBconfig();
config.awsConfig();
Passport(passport);
app.use(passport.initialize());

// allows to fetch data in json format
app.use(express.json());

// Regestring the routes in index file
app.use("/", User.UserRoutes);
app.use(
  "/book",
  passport.authenticate("jwt", { session: false }),
  Book.BookRoutes
);

// stream server on 3000 port
app.listen(process.env.PORT, () => {
  console.log(`Server started & Running at ${process.env.PORT}`);
});
