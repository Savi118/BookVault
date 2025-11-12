require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// local module
const userRouter = require("./routes/userRoute");
const bookRouter = require("./routes/bookRoute");
const wishlistRouter = require("./routes/wishlistRoute");
const readRouter = require("./routes/readRoute");

const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/read", readRouter);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo:", err);
  });
