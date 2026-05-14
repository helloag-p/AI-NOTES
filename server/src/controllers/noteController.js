const Note = require("../models/Note");
const { v4: uuidv4 } = require("uuid");


// CREATE NOTE
const createNote = async (req, res) => {
  try {

    const note = await Note.create({
      title: req.body.title || "Untitled",
      content: req.body.content || "",
      tags: req.body.tags || [],
      category: req.body.category || "",
      user: req.user._id
    });

    res.status(201).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ALL NOTES
const getNotes = async (req, res) => {
  try {

    const {
      search,
      tag,
      sort
    } = req.query;

    let query = {
      user: req.user._id,
      archived: false
    };

    // search
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          content: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // tag filter
    if (tag) {
      query.tags = tag;
    }

    // sorting
    let sortOption = {
      updatedAt: -1
    };

    if (sort === "oldest") {
      sortOption = {
        updatedAt: 1
      };
    }

    const notes = await Note.find(query)
      .sort(sortOption);

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET SINGLE NOTE
const getSingleNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// UPDATE NOTE
const updateNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.title = req.body.title || note.title;

    note.content = req.body.content || note.content;

    note.tags = req.body.tags || note.tags;

    note.category = req.body.category || note.category;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE NOTE
const deleteNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ARCHIVE NOTE
const archiveNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.archived = true;

    await note.save();

    res.status(200).json({
      message: "Note archived"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const shareNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.isPublic = true;

    note.shareId = uuidv4();

    await note.save();

    res.status(200).json({
      message: "Share link generated",
      shareLink: `http://localhost:5173/shared/${note.shareId}`
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getSharedNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      shareId: req.params.shareId,
      isPublic: true
    }).populate(
      "user",
      "name email"
    );

    if (!note) {
      return res.status(404).json({
        message: "Shared note not found"
      });
    }

    res.status(200).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  archiveNote,
  shareNote,
  getSharedNote
};