const Validator = require("validator");
const isEmpty = require("is-empty");
const { Book } = require("../models");
const { Validation } = require("../utils");

module.exports = {
  validateProduct: (req, res, next) => {
    let errors = {};
    //Book title  check
    if (req.body.title === "") {
      errors.title = "Book title required";
    } else if (typeof req.body.title != "undefined") {
      req.body.title = Validator.trim(Validator.escape(req.body.title));
    }

    //Book Price Check
    if (req.body.price === "") {
      errors.price = "Price is required";
    } else if (typeof req.body.price != "undefined") {
      if (!Validator.isFloat(req.body.price)) {
        errors.price = "Enter valid Book price";
      } else {
        req.body.price = Validator.trim(Validator.escape(req.body.price));
      }
    }

    // Book Details Check
    if (req.body.details === "") {
      errors.details = "Details Name required";
    } else if (typeof req.body.details != "undefined") {
      req.body.details = Validator.trim(Validator.escape(req.body.details));
    }

    // Author Check
    if (req.body.author === "") {
      errors.author = "Please provide author";
    } else if (typeof req.body.author != "undefined") {
      req.body.author = Validator.trim(Validator.escape(req.body.author));
    }

    //Genere Check
    if (req.body.genere === "") {
      errors.genere = "Genere required";
    } else if (typeof req.body.genere != "undefined") {
      req.body.genere = Validator.trim(Validator.escape(req.body.genere));
    }
    return isEmpty(errors) ? next() : res.status(406).json(errors);
  },
};
