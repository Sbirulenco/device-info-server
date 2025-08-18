const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// POST endpoint to log data
app.post('/log', (req, res) => {
  const data = req.body;

  // Get user IP
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  data.ip = ip;

  console.log("Received data:", data);

  const logFile = 'logs.json';
  let logs = [];
  if (fs.existsSync(logFile)) {
    try { logs = JSON.parse(fs.readFileSync(logFile)); } 
    catch(err){ console.error("Error reading logs.json:", err); }
  }
  logs.push(data);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));

  res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
