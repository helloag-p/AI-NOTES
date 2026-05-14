const Note = require("../models/Note");

const getDashboardStats = async (req, res) => {
  try {

    const userId = req.user._id;

    // total notes
    const totalNotes = await Note.countDocuments({
      user: userId
    });

    // archived notes
    const archivedNotes = await Note.countDocuments({
      user: userId,
      archived: true
    });

    // recent notes
    const recentNotes = await Note.find({
      user: userId
    })
      .sort({ updatedAt: -1 })
      .limit(5);

    // AI summaries count
    const aiGeneratedNotes = await Note.countDocuments({
      user: userId,
      summary: {
        $ne: ""
      }
    });

    // most used tags
    const notes = await Note.find({
      user: userId
    });

    const tagCount = {};

    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        tagCount[tag] =
          (tagCount[tag] || 0) + 1;
      });
    });

    // weekly activity
    const weeklyActivity = await Note.countDocuments({
      user: userId,
      updatedAt: {
        $gte: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000
        )
      }
    });

    res.status(200).json({
      totalNotes,
      archivedNotes,
      aiGeneratedNotes,
      weeklyActivity,
      mostUsedTags: tagCount,
      recentNotes
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getDashboardStats
};