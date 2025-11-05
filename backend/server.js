import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import auth from './middleware/auth.js'
import * as authController from './controllers/authController.js'

const app = express()
app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || ''
const PORT = process.env.PORT || 5000

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Mongo connection error:', err))
} else {
  console.log('MONGO_URI not set; skipping DB connection (see .env.example)')
}

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' })
})

// Register
app.post('/api/auth/register', authController.register)

// Login
app.post('/api/auth/login', authController.login)

// Protected - get current user
app.get('/api/me', auth, authController.me)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
