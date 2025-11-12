const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 8 },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  readBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);
