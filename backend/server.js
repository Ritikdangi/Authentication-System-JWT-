import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import auth from './middleware/auth.js'
import * as authController from './controllers/authController.js'

const app = express()

// CORS - allow all origins and Authorization header (per request)
const corsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

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

// Serve frontend static files if built
try {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const clientDistPath = path.join(__dirname, '..', 'frontend', 'dist')
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath))

    // For all non-API routes, serve index.html (SPA history fallback)
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: 'Not found' })
      }
      return res.sendFile(path.join(clientDistPath, 'index.html'))
    })
  }
} catch (err) {
  console.error('Error setting up static serving:', err)
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
