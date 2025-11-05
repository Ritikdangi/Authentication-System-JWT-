require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 5000;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Mongo connection error:', err));
} else {
  console.log('MONGO_URI not set; skipping DB connection (see .env.example)');
}

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Basic placeholder auth routes (implement as needed)
app.post('/api/auth/register', (req, res) => {
  // implement registration with bcrypt & JWT
  res.status(501).json({ message: 'Not implemented' });
});

app.post('/api/auth/login', (req, res) => {
  // implement login with JWT
  res.status(501).json({ message: 'Not implemented' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
