const express = require("express");
const { getAllBooks, addBook } = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");
const authOptional = require("../middleware/authOptional");

const bookRouter = express.Router();

bookRouter.get("/all", authOptional, getAllBooks);
bookRouter.post("/", protect, addBook);

module.exports = bookRouter;
