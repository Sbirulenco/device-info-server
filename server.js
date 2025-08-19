const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");

const app = express();
app.use(cors());
app.use(express.json());

// Serve index.html and other static files
app.use(express.static(path.join(__dirname)));

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// /report endpoint
app.post("/report", (req, res) => {
  const report = {
    ip: req.ip,
    time: new Date().toISOString(),
    userAgent: req.headers["user-agent"] || "Unknown",
    platform: os.platform(),
    cpuCores: os.cpus().length,
    totalMemoryGB: Math.round(os.totalmem() / 1024 / 1024 / 1024),
    freeMemoryGB: Math.round(os.freemem() / 1024 / 1024 / 1024),
    // Client-sent data
    screen: req.body.screen || "Not provided",
    gpu: req.body.gpu || "Not provided",
    battery: req.body.battery || "Not provided",
    touchSupport: req.body.touchSupport || "Not provided",
    languages: req.body.languages || "Not provided",
    timezone: req.body.timezone || "Not provided",
    prefersDark: req.body.prefersDark || "Not provided",
    prefersReducedMotion: req.body.prefersReducedMotion || "Not provided",
    adBlockLikely: req.body.adBlockLikely || "Not provided",
  };

  res.json(report);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
