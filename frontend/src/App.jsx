import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate, Link, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'

function Nav({ user, onLogout }) {
  const navigate = useNavigate()

  function handleHomeClick(e) {
    // If user is logged in, confirm logout before navigating to public Home
    if (user) {
      e.preventDefault()
      const ok = window.confirm('You are currently logged in. Do you want to logout and go to Home?')
      if (ok) {
        onLogout()
        navigate('/')
      }
    }
  }

  const activeClass = ({ isActive }) =>
    isActive
      ? 'px-2 py-1 rounded text-sm text-primary font-semibold'
      : 'px-2 py-1 rounded text-sm link-muted'

  const homeClass = ({ isActive }) =>
    isActive
      ? 'px-2 py-1 rounded text-lg text-primary font-semibold'
      : 'px-2 py-1 rounded text-lg link-muted'

  return (
    <nav className="w-full p-4 bg-white dark:bg-slate-800 shadow-sm flex items-center gap-4">
      <div className="flex items-center gap-4">
        <NavLink to="/" onClick={handleHomeClick} className={homeClass} end>
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/signup" className={activeClass}>Signup</NavLink>
            <NavLink to="/login" className={activeClass}>Login</NavLink>
          </>
        )}

        {user && <NavLink to="/profile" className={activeClass}>Profile</NavLink>}
      </div>
      <div className="ml-auto">
        {user ? (
          <button onClick={() => { onLogout(); navigate('/') }} className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:opacity-90 transition">Logout</button>
        ) : null}
      </div>
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
      <div className="min-h-screen bg-soft-50 dark:bg-slate-900">
        <Nav user={user} onLogout={handleLogout} />
        <main className="p-6 max-w-3xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center mt-16 gap-6">
                  <h2 className="text-3xl font-semibold">Welcome</h2>
                  <p className="text-gray-600 dark:text-slate-300">Please choose an option to continue</p>
                  <div className="flex gap-4">
                    <Link to="/signup" className="btn-primary">Signup</Link>
                    <Link to="/login" className="btn-secondary">Login</Link>
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
