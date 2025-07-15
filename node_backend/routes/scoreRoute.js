// node_backend/routes/scoreRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getScoreFromText, getScoreFromPdf } = require("../controllers/scoreController");

// PDF upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, "resume_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/", getScoreFromText);        // text input
router.post("/pdf", upload.single("resume"), getScoreFromPdf);  // pdf upload

module.exports = router;
