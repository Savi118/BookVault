const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("name").notEmpty(),
    body("username").matches(/^[a-zA-Z0-9]+$/),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
  ],
  registerUser
);

userRouter.post("/login", loginUser);
module.exports = userRouter;
