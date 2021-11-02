const express = require("express");
const Book = express.Router();

const { BookController } = require("../controllers");

Book.post("/addBook", BookController.bookAdd);
Book.put("/:id/updateBook", BookController.bookUpdate);
Book.delete("/:id/deleteBook", BookController.bookDelete);
Book.get("/allBook", BookController.bookAll);
Book.get("/:id/book", BookController.specificBook);

module.exports = Book;
