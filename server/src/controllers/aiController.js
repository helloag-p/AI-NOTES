const Note = require("../models/Note");

const model = require("../config/gemini");


// GENERATE AI CONTENT
const generateAIContent = async (req, res) => {
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

    const prompt = `
You are an AI assistant.

Analyze the following note and return:

1. Summary
2. Action Items
3. Suggested Title

Return ONLY valid JSON in this format:

{
  "summary": "",
  "actionItems": [],
  "suggestedTitle": ""
}

NOTE:
${note.content}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    // remove markdown if Gemini adds it
    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedResponse);

    // save in DB
    note.summary = parsedData.summary;

    note.actionItems = parsedData.actionItems;

    if (
      note.title === "Untitled" ||
      !note.title
    ) {
      note.title = parsedData.suggestedTitle;
    }

    await note.save();

    res.status(200).json(parsedData);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  generateAIContent
};