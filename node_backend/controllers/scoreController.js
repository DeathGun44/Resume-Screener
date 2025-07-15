const fs = require("fs");
const pdfParse = require("pdf-parse");
const { sendToPythonService } = require("../utils/apiClient");
const { getRecruiterFeedback, getAtsFeedback } = require("../utils/groqClient");

// For raw resume text
const getScoreFromText = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Missing resumeText" });
    }

    if (!jobDescription) {
      // 🟡 ATS fallback mode
      const ats = await getAtsFeedback(resumeText);
      return res.json({ mode: "ats_analysis", ...ats });
    }

    // 🟢 JD-matching mode
    const rawResult = await sendToPythonService(resumeText, jobDescription);
    const enriched = await getRecruiterFeedback(rawResult);
    res.json({ mode: "match_analysis", ...enriched });
  } catch (err) {
    console.error("Error in getScoreFromText:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// For uploaded PDF resumes
const getScoreFromPdf = async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const filePath = req.file.path;

    if (!filePath) {
      return res.status(400).json({ error: "Missing PDF file" });
    }

    const pdfBuffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(pdfBuffer);
    const resumeText = parsed.text;

    if (!jobDescription) {
      // 🟡 ATS fallback mode for PDF
      const ats = await getAtsFeedback(resumeText);
      return res.json({ mode: "ats_analysis", ...ats });
    }

    // 🟢 JD-matching mode for PDF
    const rawResult = await sendToPythonService(resumeText, jobDescription);
    const enriched = await getRecruiterFeedback(rawResult);
    res.json({ mode: "match_analysis", ...enriched });
  } catch (err) {
    console.error("Error in getScoreFromPdf:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getScoreFromText,
  getScoreFromPdf,
};
