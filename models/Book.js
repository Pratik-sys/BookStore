const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookDetails: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    default: "0",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  genere: {
    type: String,
    required: true,
  },
  img: {
    awsKey: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});
module.exports = mongoose.model("book", BookSchema);
