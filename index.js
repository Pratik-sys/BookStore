const express = require("express");
const app = express();
const User = require("./routes");
const Book = require("./routes");
const config = require("./config");

// load configs and init Database
require("dotenv").config();
config.DBconfig();

// stream server on 3000 port
app.listen(process.env.PORT, () => {
  console.log(`Server started & Running at ${process.env.PORT}`);
});

// allows to fetch data in json format
app.use(express.json());

// Register all the routes in index file
app.use("/", User.UserRoutes);
app.use("/book", Book.BookRoutes);
