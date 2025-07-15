const axios = require("axios");

const getRecruiterFeedback = async (analysis) => {
  // Step 1: Sanitize & limit prompt length
  const safeAnalysis = JSON.stringify(analysis, null, 2).slice(0, 3500); // Prevent overflow

  const prompt = `
You are an expert technical recruiter.

You are given a resume-to-job-description keyword analysis like this:

${safeAnalysis}

Based on this, return ONLY a valid JSON in the following structure:

{
  "match_percent": number (e.g. 68),
  "summary": "1-2 line insight",
  "suggestions": ["tip 1", "tip 2", "tip 3"],
  "categories": {
    "Backend": { "matched": [...], "missing": [...] },
    "Cloud": { "matched": [...], "missing": [...] },
    "DevOps": { "matched": [...], "missing": [...] },
    "Frontend": { "matched": [...], "missing": [...] }
  },
  "visual_tags": ["✔ Node.js", "✖ AWS", ...]
}

Only return pure JSON. No markdown. No comments. No extra text.
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    // Step 2: Try parsing JSON response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("❌ Groq response was not valid JSON:", content);
      throw new Error("Groq did not return valid JSON");
    }

    return parsed;
  } catch (err) {
    console.error("❌ Error from Groq:", err.response?.data || err.message);
    throw new Error("Groq feedback generation failed");
  }
};

const getAtsFeedback = async (resumeText) => {
  const safeResume = resumeText.slice(0, 4000); // Limit to avoid token overflow

  const prompt = `
You are an ATS (Applicant Tracking System) evaluator.

Evaluate the following resume's readiness for ATS screening:

"${safeResume}"

Now return ONLY valid JSON with the structure:

{
  "ats_score": number (0–100),
  "issues": [
    "brief bullet point of detected issue 1",
    "issue 2",
    "issue 3"
  ],
  "suggestions": [
    "tip 1 to improve resume",
    "tip 2",
    "tip 3"
  ],
  "visual_tags": [
    "✔ Header Format",
    "✖ No Skills Section",
    "✔ PDF-friendly"
  ]
}

Only output valid JSON. No explanations or extra text.
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    try {
      return JSON.parse(content);
    } catch (err) {
      console.error("❌ Invalid ATS JSON:", content);
      throw new Error("Groq did not return valid JSON");
    }
  } catch (err) {
    console.error("❌ Error in getAtsFeedback:", err.response?.data || err.message);
    throw new Error("Groq ATS feedback generation failed");
  }
};

module.exports = { getRecruiterFeedback, getAtsFeedback };
