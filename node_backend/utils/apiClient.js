// node_backend/utils/apiClient.js
const axios = require("axios");

const sendToPythonService = async (resumeText, jobDescription) => {
  const response = await axios.post("http://localhost:5000/embed-match", {
    resume: resumeText,
    job_description: jobDescription,
  });

  return response.data;
};

module.exports = { sendToPythonService };
