const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json').development;

// Log configuration values to ensure they are being read correctly
console.log('Database configuration:', config);

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
});

const User = require('./models/user')(sequelize, DataTypes);

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()

// Database synchronization
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

// Define routes

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(204).send(); // No content
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
