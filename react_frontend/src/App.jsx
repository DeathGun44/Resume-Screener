import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeScanner from './pages/ResumeScanner';
import ATSResultPage from './pages/atsResultPage';
import JDResultPage from './pages/jdResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeScanner />} /> 
        <Route path="/ats-result" element={<ATSResultPage />} />
        <Route path="/jd-result" element={<JDResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

