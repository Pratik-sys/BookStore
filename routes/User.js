const express = require("express");
const User = express.Router();

const { UserController } = require("../controllers");

User.post("/register", UserController.Register),
  User.post("/login", UserController.Login);

module.exports = User;
