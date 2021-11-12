const express = require("express");
const User = express.Router();

const { BookController, UserController } = require("../../controllers");

User.post("/addBook", BookController.bookAdd);
User.put("/:id/updateBook", BookController.bookUpdate);
User.delete("/:id/deleteBook", BookController.bookDelete);
User.get("/allBook", BookController.bookAll);
User.get("/:id/book", BookController.specificBook);
User.get("/details", UserController.userDetails);

module.exports = User;
