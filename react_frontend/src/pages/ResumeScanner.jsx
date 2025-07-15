import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResumeScanner.css";
import LoadingScreen from "../components/loadingScreen";

const ResumeScanner = () => {
  const [jobDescEnabled, setJobDescEnabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // controls loading screen
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Show loading screen

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      if (jobDescEnabled && jobDescription.trim() !== "") {
        formData.append("jobDescription", jobDescription);
      }

      const response = await axios.post("http://localhost:8080/api/score/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data;

      // Delay navigation until loading screen finishes
      setTimeout(() => {
        if (result.mode === "ats_analysis") {
          navigate("/ats-result", { state: result });
        } else {
          navigate("/jd-result", { state: result });
        }
      }, 5000); // Duration should match your LoadingScreen animation
    } catch (err) {
      setLoading(false);
      setError("Error uploading resume. Please try again.");
    }
  };

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploaded(true);
    }
  };

  // ⬇️ If loading, show loading screen
  if (loading) return <LoadingScreen />;

  return (
    <div className="scanner-wrapper dark-theme">
      <header className="app-bar">
        <h1>AI Resume Scanner</h1>
      </header>

      <main className="scanner-content two-column-layout">
        <div className="info-panel animate-slide-in">
          <h2 className="scanner-heading">How Good is Your Resume?</h2>
          <p className="scanner-subtext">
            Upload your resume and get instant insights powered by AI.
Discover how well your resume aligns with your target job description.
Identify missing keywords, improve formatting, and strengthen impact.
Receive personalized suggestions to boost your chances of getting noticed.
Visualize your strengths and areas for improvement with clear analytics.
Stand out in the hiring process with a data-driven resume strategy.
          </p>
          <p className="scanner-subtext privacy-note">
            🔒 Your data is never stored. Private and secure.
We process your resume in real-time and discard it immediately after analysis.
Your privacy is our top priority — no tracking, no saving, no sharing.
          </p>
        </div>

        <div className="upload-section-wrapper">
          <form className="upload-section" onSubmit={handleSubmit}>
            <div className="upload-box clickable" onClick={handleFileClick}>
              <p>
                {uploaded ? (
                  <span className="upload-success">✅ Resume Uploaded ✔️</span>
                ) : (
                  "📄 Click to upload your resume"
                )}
              </p>
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                required
              />
            </div>

            <div className="switch-row">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={jobDescEnabled}
                  onChange={() => setJobDescEnabled(!jobDescEnabled)}
                />
                <span className="slider"></span>
              </label>
              <span className="switch-label">Job Description-Oriented Scanning</span>
            </div>

            {jobDescEnabled && (
              <textarea
                className="job-description-input"
                placeholder="Paste job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            )}

            <button className="analyze-button" type="submit">
              Analyze Resume
            </button>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResumeScanner;
