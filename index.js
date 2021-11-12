const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();

const Auth = require("./routes/Auth");
const Client = require("./routes/Client");
const Public = require("./routes/Public");
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
app.use("/", [Auth.AuthRoutes, Public.Bookroutes]);
app.use("/client", passport.authenticate("jwt", { session: false }), [
  Client.UserRoutes,
]);

// stream server on 3000 port
app.listen(process.env.PORT, () => {
  console.log(`Server started & Running at ${process.env.PORT}`);
});
