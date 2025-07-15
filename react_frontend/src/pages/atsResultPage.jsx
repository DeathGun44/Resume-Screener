import React, { useState, useEffect } from "react";
import ScoreSection from "../components/scoreSection";
import "./atsResultPage.css";
import { useLocation, useNavigate } from 'react-router-dom';

const AtsResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleHowItWorksClick = () => setShowHowItWorks(true);
  const handleCloseModal = () => setShowHowItWorks(false);

  const {
    ats_score = 80,
    issues = [],
    suggestions = [],
    visual_tags = [],
  } = result || {};

  return (
    <div className="dark-theme">
      {/* Modal */}
      {showHowItWorks && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🔍 How It Works</h2>
            <p>
              We scan your resume using AI models to analyze structure, keywords, and formatting.
              Your score reflects how well your resume aligns with Applicant Tracking Systems (ATS) best practices.
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
          <button className="how-it-works-button" onClick={handleHowItWorksClick}>
            🔍 How It Works
          </button>
        </div>

        <ScoreSection score={ats_score} type="ATS" />

        <div className="issues-section">
          <h2><span className="emoji">🚨</span> Potential Issues Found</h2>
          <ul className="animated-list">
            {issues.map((issue, index) => (
              <li key={index} className="issue-item">➡️ {issue}</li>
            ))}
          </ul>
        </div>

        <div className="suggestions-section">
          <h2><span className="emoji">💡</span> Suggestions to Improve</h2>
          <ul className="animated-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item">🔄 {suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="positives-section">
          <h2><span className="emoji">👌</span> What You're Doing Right</h2>
          <p className="positive-note">
            These elements in your resume are already optimized. Keep them strong!
          </p>
          <div className="tags-container">
            {visual_tags.map((tag, index) => (
              <span key={index} className="positive-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtsResultPage;
