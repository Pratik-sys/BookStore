const express = require("express");
const app = express();
const User = require("./routes");
const Book = require("./routes");
const config = require("./config");
const passport = require("passport");
const { Passport } = require("./config/passport");

// load configs and init Database
require("dotenv").config();
config.DBconfig();
config.awsConfig();
// allows to fetch data in json format
app.use(express.json());

app.use(passport.initialize());
Passport(passport);

// Register all the routes in index file
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
