const { validationResult } = require("express-validator");
const User = require("../models/users");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing)
      return res
        .status(400)
        .json({ message: "Username or email already exists" });

    const user = await User.create({ name, username, email, password });
    res.status(201).json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    res.json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        wishlist: user.wishlist,
        readBooks: user.readBooks,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
