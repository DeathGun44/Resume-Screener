// node_backend/index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const scoreRoutes = require("./routes/scoreRoute");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/score", scoreRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Node.js backend running on http://localhost:${PORT}`);
});
