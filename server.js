const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors()); // allow frontend requests
app.use(express.json());

// Root route (optional)
app.get("/", (req, res) => {
  res.send("✅ Device Info Server is running");
});

// Report endpoint (must match your fetch URL)
app.post("/report", (req, res) => {
  const report = {
    userAgent: req.headers["user-agent"] || "Unknown",
    platform: process.platform,
    time: new Date().toISOString(),
    ip: req.ip
  };

  res.json(report); // MUST return JSON
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
