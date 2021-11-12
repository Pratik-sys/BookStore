const express = require("express");
const Auth = express.Router();

const { AuthController } = require("../../controllers");
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../../middlewares");

Auth.post("/register", validateRegisterInput, AuthController.Register),
  Auth.post("/login", validateLoginInput, AuthController.Login);

module.exports = Auth;
