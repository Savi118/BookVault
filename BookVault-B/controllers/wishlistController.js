const User = require("../models/users");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("wishlist");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id?.toString();
    const { bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: "Missing user or book ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.wishlist.includes(bookId)) {
      return res.json({ success: true, message: "Already in wishlist" });
    }

    user.wishlist.push(bookId);
    await user.save();

    return res.json({ success: true, message: "Book added to wishlist" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id?.toString();
    const { bookId } = req.body;

    if (!userId || !bookId)
      return res.status(400).json({ error: "Missing user or book ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.wishlist.includes(bookId))
      return res.status(400).json({ error: "Book not found in wishlist" });

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== bookId.toString()
    );
    await user.save();

    res.json({ success: true, message: "Book removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
