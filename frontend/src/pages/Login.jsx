import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth.js'

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await login({ email, password })
      if (data.token) {
        localStorage.setItem('token', data.token)
        try {
          const payload = JSON.parse(atob(data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
          localStorage.setItem('user', JSON.stringify(payload))
          onAuth && onAuth(payload)
        } catch (e) { }
        navigate('/profile')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="p-2 border rounded" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Sign in</button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}
