import React, { useEffect, useState } from "react";
import "./loadingScreen.css";

const messages = [
  "Waiting for resume...",
  "Analyzing content...",
  "Optimizing results..."
];

const LoadingScreen = ({ onComplete = () => {} }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length);
    }, 2000);

    const finishTimer = setTimeout(onComplete, 2000 * messages.length + 1000);

    return () => {
      clearInterval(msgTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="loader-wrapper">
      <div className="circle">
  <svg viewBox="0 0 100 100">
    <circle className="pulse" cx="50" cy="50" r="45" />
  </svg>
</div>

      <div className="loading-text">{messages[msgIndex]}</div>
    </div>
  );
};

export default LoadingScreen;
