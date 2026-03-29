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
  if (users.length === 0) {
    // ❌ rarely tested branch
    return res.status(404).json({ message: 'No users found' });
  }
  res.json(users);
});

// Create user
app.post('/users', (req, res) => {
  const user = req.body;

  // ❌ untested validation branch
  if (!user.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  users.push(user);
  res.status(201).json(user);
});

// ❌ Unused endpoint (no tests will cover this)
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  users = users.filter((u, index) => index != id);
  res.status(200).json({ message: 'User deleted' });
});

// ❌ Complex unused logic (coverage killer)
function calculateUserScore(user) {
  if (!user) return 0;

  if (user.age > 30) {
    if (user.isActive) {
      return 100;
    } else {
      return 50;
    }
  } else {
    if (user.isActive) {
      return 70;
    } else {
      return 20;
    }
  }
}

// ❌ Another unused function
function internalAuditLog(action) {
  if (action === 'CREATE') {
    console.log('User created');
  } else if (action === 'DELETE') {
    console.log('User deleted');
  } else {
    console.log('Unknown action');
  }
}

module.exports = app;

// Start server only if not testing
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}