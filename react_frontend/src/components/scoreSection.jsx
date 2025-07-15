import React from "react";
import "./scoreSection.css";

const ScoreSection = ({ score, type }) => {
  const getFeedback = () => {
    if (score >= 80) {
      return "Great start! Your resume demonstrates strong alignment with key criteria hiring managers and applicant tracking systems look for.\n\nRefer below for your complete resume analysis.";
    } else if (score >= 60) {
      return "You're on the right track! Several sections are doing well.\n\nRefer below for your complete resume analysis.";
    } else if (score >= 40) {
      return "Some elements of your resume are working, but there’s plenty of room to improve.\n\nRefer below for your complete resume analysis.";
    } else {
      return "Your resume needs major improvements, but don’t worry — we’ll walk you through everything you need to fix it.\n\nRefer below for your complete resume analysis.";
    }
  };

  const barPosition = `${score}%`;

  return (
    <div className="dark-theme">
      <div className="score-section">
        <div className="score-wrapper">
          <div className="score-header">
            <h2>Your {type} Resume Score</h2>
            <p>Here’s how we’ll help improve your resume’s success rate.</p>
          </div>

          <div className="score-card">
            <h3>Your resume scored {score} out of 100.</h3>
            <p>{getFeedback()}</p>

            <div className="score-bar">
              <div className="score-range">
                <span>0</span>
                <span>100</span>
              </div>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: barPosition }}></div>
                <div
                  className="score-pointer"
                  style={{ left: `calc(${barPosition} - 10px)` }}
                ></div>
              </div>
            </div>

            <div className="score-info-box">
              <p className="score-note">
                💡 Your score is benchmarked against 1M+ resumes at your level,
                based on 20+ key recruiter checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;
