const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = { id: user._id, username: user.username, email: user.email };
    next();
  } catch (err) {
    console.error("❌ Auth Middleware Error:", err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
