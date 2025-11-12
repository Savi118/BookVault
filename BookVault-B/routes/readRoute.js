const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const readController = require("../controllers/readController");
const readRouter = express.Router();

readRouter.get("/get-read", protect, readController.getRead);
readRouter.post("/mark-read", protect, readController.markToRead);
readRouter.post("/remove", protect, readController.removeFromRead);

module.exports = readRouter;
