const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // allow frontend requests
app.use(express.json());

// Root test endpoint
app.get("/", (req, res) => {
  res.send("✅ Device Info Server is running");
});

// Report endpoint
app.post("/report", (req, res) => {
  // Example device info response
  const report = {
    os: req.headers["user-agent"] || "Unknown",
    time: new Date().toISOString(),
    ip: req.ip,
  };

  res.json(report); // IMPORTANT: always JSON, never HTML
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
