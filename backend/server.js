// backend/server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const authenticateToken = require("./middleware/authMiddleware");
const Faculty = require("./models/Faculty");

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // keep in .env

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   MULTER SETUP
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads/profiles");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* =========================
   FACULTY PROFILE UPDATE
========================= */
app.put(
  "/api/faculty/profile",
  authenticateToken,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { name, email, phone, designation, bio } = req.body;
      const facultyId = req.user.id;

      let profileImage = req.user.profileImage;
      if (req.file) {
        profileImage = `/uploads/profiles/${req.file.filename}`;
      }

      const updated = await Faculty.findByIdAndUpdate(
        facultyId,
        { name, email, phone, designation, bio, profileImage },
        { new: true, runValidators: true }
      );

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/* =========================
   GEMINI TEST ROUTE
========================= */
app.get("/test-gemini", async (req, res) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: "Write a welcome message for placement portal" }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.response?.data || error.message);
  }
});

/* =========================
   STATIC FILES
========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend")));

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/interview", require("./routes/interviewRoutes"));

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

/* =========================
   FRONTEND FALLBACK
========================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
