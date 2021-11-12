const express = require("express");
const User = express.Router();

const { BookController, UserController } = require("../../controllers");
const {validateBook} = require("../../middlewares")

User.post("/addBook", validateBook,BookController.bookAdd);
User.put("/:id/updateBook", validateBook,BookController.bookUpdate);
User.delete("/:id/deleteBook", BookController.bookDelete);
User.get("/allBook", BookController.bookAll);
User.get("/:id/book", BookController.specificBook);
User.get("/details", UserController.userDetails);

module.exports = User;
