// Import the necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize the Express application
const app = express();
const PORT = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle login requests
app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;

  // Simple authentication check (for demonstration purposes)
  if (username === 'admin' && password === 'password') {
    res.json({ message: 'Login successful!' });
  } else {
    res.json({ message: 'Invalid username or password.' });
  }
});

// Route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
