const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateAIContent
} = require("../controllers/aiController");

router.post(
  "/:id/generate",
  protect,
  generateAIContent
);

module.exports = router;