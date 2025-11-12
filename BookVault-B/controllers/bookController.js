const Book = require("../models/books");
const User = require("../models/users");

exports.getAllBooks = async (req, res) => {
  try {
    const userId = req.user?.id;
    let excludeIds = [];

    if (userId) {
      const user = await User.findById(userId);
      excludeIds = user?.readBooks || [];
    }

    const books = await Book.find({
      _id: { $nin: excludeIds },
    });

    return res.json({ success: true, books });
  } catch (err) {
    console.error("❌ Fetch Books Error:", err.message);
    res.status(500).json({ message: "Error fetching books" });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, description, coverImage } = req.body;
    const book = await Book.create({ title, author, description, coverImage });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error adding book" });
  }
};
