import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'

function Nav({ user, onLogout }) {
  return (
    <nav className="w-full p-4 bg-white shadow-sm flex gap-4">
      <Link to="/" className="font-semibold">Home</Link>
      {!user && <Link to="/signup">Signup</Link>}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/profile">Profile</Link>}
      {user && (
        <button onClick={onLogout} className="ml-auto bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      )}
    </nav>
  )
}

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
        setUser(payload)
      } catch (e) {
        setUser(null)
      }
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Nav user={user} onLogout={handleLogout} />
        <main className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center mt-16 gap-6">
                  <h2 className="text-3xl font-semibold">Welcome</h2>
                  <p className="text-gray-600">Please choose an option to continue</p>
                  <div className="flex gap-4">
                    <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded">Signup</Link>
                    <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">Login</Link>
                  </div>
                </div>
              }
            />
            <Route path="/signup" element={<Signup onAuth={(u) => setUser(u)} />} />
            <Route path="/login" element={<Login onAuth={(u) => setUser(u)} />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
