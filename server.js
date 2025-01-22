// filepath: /c:/Users/bapis/.vscode/Creaturez-1/server.js
const express = require('express');
const app = express();
const port = 3001;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});