const User = require("../models/users");

exports.getRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("readBooks");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, readBooks: user.readBooks });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.markToRead = async (req, res) => {
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

    if (user.readBooks.includes(bookId)) {
      return res.json({ success: true, message: "Already marked as read" });
    }

    user.readBooks.push(bookId);
    await user.save();

    return res.json({ success: true, message: "Book marked as read" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromRead = async (req, res) => {
  try {
    const userId = req.user.id?.toString();
    const { bookId } = req.body;

    if (!userId || !bookId)
      return res.status(400).json({ error: "Missing user or book ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.readBooks.includes(bookId))
      return res.status(400).json({ error: "Book not found in ReadBooks" });

    user.readBooks = user.readBooks.filter(
      (id) => id.toString() !== bookId.toString()
    );
    await user.save();

    res.json({ success: true, message: "Book removed from ReadBooks" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
