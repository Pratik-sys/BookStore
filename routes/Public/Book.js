const express = require("express");
const Book = express.Router();

const { BookController } = require("../../controllers");

Book.get("/allBook", BookController.bookAll);
Book.get("/:id/book", BookController.specificBook);

module.exports = Book;
