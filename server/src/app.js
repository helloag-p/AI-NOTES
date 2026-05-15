const express = require("express");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const noteRoutes = require("./routes/noteRoutes");

const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-notes-tlnq.onrender.com/"
    ],
    credentials: true
  })
);

app.use(express.json());

app.use(cookieParser());


// routes
app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;