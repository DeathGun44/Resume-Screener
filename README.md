# 🚀 AI Resume Screener

An AI-powered resume analyzer that evaluates your resume using semantic similarity and ATS-style keyword matching. Instantly get job-specific insights, suggestions, and a match score.

---

## 🔗 Live Demo

👉 [Try the Live App](https://resume-screener-three.vercel.app)

---

## 🧠 How It Works

1. Upload your resume (PDF only).
2. (Optional) Paste a job description for JD-based analysis.
3. The system:
   - Uses **SBERT** (Python) for semantic similarity scoring.
   - Extracts keyword matches using **Node.js** backend.
4. Displays a beautiful dashboard with:
   - ATS-style score
   - Summary & suggestions
   - Visual keyword breakdown
   - Highlighted resume strengths

---

## ✨ Features

- ✅ ATS Resume Compatibility Score
- 🤖 AI-Generated Feedback & Suggestions
- 📚 Keyword Matching (Matched / Missing)
- 🎯 Job Description Matching (Optional)
- 📊 Animated Dashboard with Visual Tags
- 🌙 Dark Mode UI

---

## 🖼 Screenshots

> Save your screenshots inside a `screenshots/` folder in the root directory.

### 📝 Home Page
![Home Page](./screenshots/home.png)

### 📊 ATS Result
![ATS Result](./screenshots/ATSScore.png)

### 🤝 How It Works
![How It Works](./screenshots/HowitWorks.png)

### 📄 Report
![Report](./screenshots/report.png)

---

## 🛠 Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | React.js           |
| Backend     | Node.js + Express  |
| AI Scoring  | Python + SBERT     |
| Styling     | Custom CSS         |
| Hosting     | Vercel + Railway   |

---

## 📁 Project Structure

root/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Pages like ResumeScanner, ResultPage
│ └── App.jsx # Main routing component
├── node_backend/ # Node.js + Express backend
│ └── routes/ # API endpoint logic (Groq, resume handler)
├── python_microservice/ # Python SBERT-based semantic scoring microservice
│ └── app.py # Flask app using Sentence-BERT
├── screenshots/ # Screenshots used in README or documentation
└── README.md # This file

## 🔒 Privacy & Security

- 🔒 **Your resume and job description are never stored.**
- ✅ **Data is processed only in memory and discarded immediately.**
- 🔐 **Secure proxy backend prevents API key exposure.**

## 🧑‍💻 Author

**Krishna Mewara**  
🎓 NIT Silchar &nbsp;&nbsp;|&nbsp;&nbsp; 💻 Full Stack Developer  
📧 krishnamewara314@gmail.com  
🌐 [LinkedIn](https://www.linkedin.com/in/krishna-mewara-127699280) • [GitHub](https://github.com/DeathGun44)


