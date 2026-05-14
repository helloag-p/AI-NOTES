const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled"
    },

    content: {
      type: String,
      default: ""
    },

    summary: {
      type: String,
      default: ""
    },

    actionItems: [
      {
        type: String
      }
    ],

    tags: [
      {
        type: String
      }
    ],

    category: {
      type: String,
      default: ""
    },

    archived: {
      type: Boolean,
      default: false
    },

    isPublic: {
      type: Boolean,
      default: false
    },

    shareId: {
      type: String,
      default: null
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);