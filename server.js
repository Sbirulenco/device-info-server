const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname)));

// Example route: generate a device info report
app.get("/report", (req, res) => {
  const report = {
    userAgent: req.headers["user-agent"],
    platform: process.platform,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  };

  res.json(report);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
