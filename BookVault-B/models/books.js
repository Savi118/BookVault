const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "https://via.placeholder.com/300x400?text=No+Cover",
  },
  description: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
});

module.exports = mongoose.model("Book", bookSchema);
