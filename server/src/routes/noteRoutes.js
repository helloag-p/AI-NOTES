const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  archiveNote,
  shareNote,
  getSharedNote
} = require("../controllers/noteController");


// routes
router.post("/", protect, createNote);

router.get("/", protect, getNotes);

router.get("/:id", protect, getSingleNote);

router.patch("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

router.post("/:id/archive", protect, archiveNote);

router.post(
  "/:id/share",
  protect,
  shareNote
);

router.get(
  "/shared/:shareId",
  getSharedNote
);

module.exports = router;