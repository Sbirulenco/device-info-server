const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());          // allow cross-origin requests
app.use(express.json());   // parse JSON body

// Root route (optional)
app.get("/", (req, res) => {
  res.send("✅ Device Info Server is running");
});

// Report endpoint
app.post("/report", (req, res) => {
  const report = {
    userAgent: req.headers["user-agent"] || "Unknown",
    platform: process.platform,
    time: new Date().toISOString(),
    ip: req.ip,
    languages: req.headers["accept-language"] || "Unknown"
  };
  res.json(report); // Always return JSON
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
