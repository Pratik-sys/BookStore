const { Book } = require("../models");
const { AwsS3Bucket } = require("../utils");

module.exports = {
  bookAdd: async (req, res) => {
    let imageDetails = {};
    try {
      if (req.body.image) {
        imageDetails = await AwsS3Bucket.imageUpload(
          req.body.image,
          req.body.title,
          req.body.genere
        );
      } else {
        imageDetails = {
          awsKey: process.env.DEFAULT_IMAGE_KEY,
          url: process.env.DEFAULT_IMAGE_URL,
        };
      }
      await new Book({
        bookTitle: req.body.title,
        bookDetails: req.body.details,
        Price: req.body.price,
        rating: req.body.rating,
        genere: req.body.genere,
        Author: req.body.author,
        img: {
          awsKey: imageDetails.Key || imageDetails.awsKey,
          url: imageDetails.Location || imageDetails.url,
        },
      }).save();
      return res.status(201).json({ msg: "Book added !" });
    } catch (error) {
      await AwsS3Bucket.deleteImage(imageDetails.awsKey); // delete the image if there is an error while adding book
      return res.status(404).json({ msg: "Error while addding" });
    }
  },
  bookUpdate: async (req, res) => {
    let imageDetails = {};
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
      if (req.body.image) {
        imageDetails = await AwsS3Bucket.imageUpload(
          req.body.image,
          req.body.title || book.bookTitle,
          req.body.genere || book.genere
        );
        if (book.img.awsKey != process.env.DEFAULT_IMAGE_KEY) {
          await AwsS3Bucket.deleteImage(book.img.awsKey);
        }
      } else {
        imageDetails = book.img;
      }
      await Book.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bookTitle: req.body.title || book.bookTitle,
            bookDetails: req.body.details || book.bookDetails,
            Price: req.body.price || book.price,
            rating: req.body.rating || book.rating,
            genere: req.body.genere || book.genere,
            Author: req.body.author || book.Author,
            img: {
              awsKey: imageDetails.Key || imageDetails.awsKey,
              url: imageDetails.Location || imageDetails.url,
            },
          },
        }
      );
      return res.status(202).json({ msg: "Book updated !" });
    } catch (error) {
      await AwsS3Bucket.deleteImage(book.img.awsKey); // delete the image if there is an error while updating book
      return res.status(404).json({ msg: "Error while updating book" });
    }
  },
  bookDelete: async (req, res) => {
    try {
      const book = await Book.findOne({ _id: req.params.id });
      if (!book) {
        return res.status(404).json({ msg: "Nothing to delete here" });
      }
      await AwsS3Bucket.deleteImage(book.img.awsKey);
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
};
