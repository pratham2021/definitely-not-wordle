const express = require('express');
const path = require("path");

const app = express();

app.use(express.json());

app.get('/ping-wordle', async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;

  const response = await fetch(`https://www.nytimes.com/svc/wordle/v2/${date}.json`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',    
    }
  });

  const data = await response.json();
  res.json(data);
});

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});