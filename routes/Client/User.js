const express = require("express");
const User = express.Router();

const { BookController } = require("../../controllers");

User.post("/addBook", BookController.bookAdd);
User.put("/:id/updateBook", BookController.bookUpdate);
User.delete("/:id/deleteBook", BookController.bookDelete);
User.get("/allBook", BookController.bookAll);
User.get("/:id/book", BookController.specificBook);

module.exports = User;
