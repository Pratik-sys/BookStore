const { validateBook } = require("./BookValidation");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("./UserValidations");

module.exports = {
  validateBook,
  validateRegisterInput,
  validateLoginInput,
};
