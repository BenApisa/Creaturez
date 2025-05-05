const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve specific HTML files for specific routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.get('/creatures', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/creatures.html'));
});

app.get('/battle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/battle.html'));
});

app.get('/packs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/packs.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
