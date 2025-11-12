const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const wishlistController = require("../controllers/wishlistController");
const wishlistRouter = express.Router();

wishlistRouter.get("/get", protect, wishlistController.getWishlist);
wishlistRouter.post("/add", protect, wishlistController.addToWishlist);
wishlistRouter.post("/remove", protect, wishlistController.removeFromWishlist);

module.exports = wishlistRouter;
