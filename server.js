const express = require("express");
const cors = require("cors");
const app = express();

// Allow requests from anywhere
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ Device Info Server is running");
});

// Report endpoint
app.post("/report", (req, res) => {
  // Example detailed device info
  const report = {
    ip: req.ip,
    time: new Date().toISOString(),
    userAgent: req.headers["user-agent"] || "Unknown",
    platform: process.platform,
    cpuCores: require("os").cpus().length,
    totalMemoryGB: Math.round(require("os").totalmem() / 1024 / 1024 / 1024),
    freeMemoryGB: Math.round(require("os").freemem() / 1024 / 1024 / 1024),
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
