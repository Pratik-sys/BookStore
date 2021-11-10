const { Book } = require("../models");
const { imageUpload} = require("../utils/ImageUpload");

module.exports = {
  bookAdd: async (req, res) => {
    try {
      const image = await imageUpload(
        req.body.image,
        req.body.title,
        req.body.genere
      );
      await new Book({
        bookTitle: req.body.title,
        bookDetails: req.body.details,
        Price: req.body.price,
        rating: req.body.rating,
        genere: req.body.genere,
        img: {
          awsId: image.ETag,
          url: image.Location,
        },
      }).save();
      return res.status(201).json({ msg: "Book added !" });
    } catch (error) {
      return res.status(404).json({ msg: "Error while addding" });
    }
  },
  bookUpdate: async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bookTitle: req.body.title,
            bookDetails: req.body.details,
            Price: req.body.price,
            rating: req.body.rating,
            genere: req.body.genere,
          },
        }
      );
      return res.status(202).json({ msg: "Book updated !" });
    } catch (error) {
      return res.status(404).json({ msg: "Error while updating book" });
    }
  },
  bookDelete: async (req, res) => {
    try {
      const book = await Book.findOne({ _id: req.params.id });
      if (!book) {
        return res.status(404).json({ msg: "Nothing to delete here" });
      }
      await book.remove({ _id: req.params.id });
      return res.status(200).json({ msg: "Deleted sucessfully !" });
    } catch (error) {
      return res.status(409).json({ msg: "Error while deleting" });
    }
  },
  bookAll: async (req, res) => {
    try {
      const book = await Book.find({});
      if (!book) {
        return res.status(500).json({ msg: "oops! No books to display" });
      }
      return res.status(200).json(book);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Error while fetching the books for you ;(" });
    }
  },
  specificBook: async (req, res) => {
    try {
      const book = await Book.findById({ _id: req.params.id });
      if (!book) {
        return res
          .status(404)
          .json({ msg: "Sorry, we don't have the book you requested :(" });
      }
      return res.status(200).json(book);
    } catch (error) {
      return res.status(500).json({ msg: "Error while fetching books" });
    }
  },
  // deleteall: async (req, res) => {
  //   await Book.deleteMany({});
  //   return res.json({ msg: "flushed " });
  // },
};
