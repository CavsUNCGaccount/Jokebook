const express = require('express');
const bodyParser = require('body-parser');
const jokeRoutes = require('./routes/jokeRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/jokebook', jokeRoutes);

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, 'client')));

// Start server
// Use either command: 'npm run dev' or 'npm start' 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
