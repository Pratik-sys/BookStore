const Validator = require("validator");
const isEmpty = require("is-empty");
const { User } = require("../models");
const { Validation } = require("../utils");

module.exports = {
  validateRegisterInput: async (req, res, next) => {
    let errors = {};
    req.body.name = Validation.sanitizeAndValidate(req.body.name);
    req.body.email = Validation.sanitizeAndValidate(req.body.email);

    //Name checks
    if (Validator.isEmpty(req.body.name)) {
      errors.name = "Name is required";
    }
    //Email Check
    const email = await User.findOne({ email: req.body.email });
    if (Validator.isEmpty(req.body.email)) {
      errors.email = "Email is required";
    } else if (!Validator.isEmail(req.body.email)) {
      errors.email = "Email is not valid";
    } else if (!isEmpty(email)) {
      errors.email = "Email already exist";
    }

    //Password Check
    if (Validator.isEmpty(req.body.password)) {
      errors.password = "Password is required";
    } else if (!Validator.isStrongPassword(req.body.password)) {
      errors.password =
        "Password must 8 characters long and" +
        "Must contain 1 atleast lowercase character and" +
        "Must contain 1 atleast uppercase character and" +
        "Must contain 1 atleast number and" +
        "Must contain 1 atleast special symbol character";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
  validateLoginInput: (req, res, next) => {
    let errors = {};
    req.body.email = Validation.sanitizeAndValidate(req.body.email);
    if (!Validator.isEmail(req.body.email)) {
      errors.email = "Email is not valid";
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
};
