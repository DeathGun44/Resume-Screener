import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreSection from "../components/ScoreSection";
import "./jdResultPage.css";

const JdResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    if (!result) {
      navigate("/"); // Redirect to home if no data is passed
    }
  }, [result, navigate]);

  const handleCloseModal = () => {
    setShowHowItWorks(false);
  };

  // Optional fallback in case result is missing briefly
  if (!result) {
    return <div style={{ color: "white", textAlign: "center", marginTop: "5rem" }}>Redirecting...</div>;
  }

  const {
    match_percent,
    summary,
    suggestions = [],
    categories = {},
    visual_tags = []
  } = result;

  return (
    <div className="dark-theme">
      {showHowItWorks && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🔍 How It Works</h2>
            <p>
              We scan your resume and the job description using advanced language models.
              Then we extract and match relevant skills, keywords, and structural patterns.
              Your score reflects how well your resume matches the job’s expectations.
            </p>
            <button className="close-button" onClick={handleCloseModal}>Got it!</button>
          </div>
        </div>
      )}

      <header className="app-bar">
        <h1>AI Resume Scanner</h1>
      </header>

      <div className={`result-wrapper ${showHowItWorks ? "modal-blur" : ""}`}>
        <div className="how-it-works-top-right">
          <button className="how-it-works-button" onClick={() => setShowHowItWorks(true)}>
            🔍 How It Works
          </button>
        </div>

        <ScoreSection score={match_percent} type="Job Match" />

        <div className="issues-section">
          <h2><span className="emoji">📝</span> Summary</h2>
          <p className="positive-note">{summary}</p>
        </div>

        <div className="suggestions-section">
          <h2><span className="emoji">💡</span> Suggestions to Improve</h2>
          <ul className="animated-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item">
                🔄 <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="issues-section">
          <h2><span className="emoji">📚</span> Keyword Match Breakdown</h2>
          {Object.entries(categories).map(([category, { matched, missing }]) => (
            <div key={category} style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#7ed6df" }}>{category}</h3>
              <p><strong>Matched:</strong> {matched.length > 0 ? matched.join(", ") : "None"}</p>
              <p><strong>Missing:</strong> {missing.length > 0 ? missing.join(", ") : "None"}</p>
            </div>
          ))}
        </div>

        <div className="positives-section">
          <h2><span className="emoji">👌</span> What You're Doing Right</h2>
          <p className="positive-note">
            These elements from your resume matched the job description and showcase alignment with key expectations.
          </p>
          <div className="tags-container">
            {visual_tags.filter(tag => tag.includes("✔")).map((tag, index) => (
              <span key={index} className="positive-tag">
                ✅ {tag.replace("✔", "").trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JdResultPage;
