const express = require('express');
const app = express();

app.use(express.json());

let users = [];

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Get users
app.get('/users', (req, res) => {
  res.json(users);
});

// Create user
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

module.exports = app;

// Start server only if not testing
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}