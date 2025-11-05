import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/auth.js'

export default function Signup({ onAuth }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await register({ name, email, password })
      if (data.token) {
        localStorage.setItem('token', data.token)
        // try decode user from token
        try {
          const payload = JSON.parse(atob(data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
          localStorage.setItem('user', JSON.stringify(payload))
          onAuth && onAuth(payload)
        } catch (e) { }
        navigate('/profile')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="p-2 border rounded" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="p-2 border rounded" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create account</button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}
