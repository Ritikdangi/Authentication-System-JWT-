import React from 'react'

export default function Profile({ user }) {
  // user is decoded token payload if available
  const stored = user || JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Profile</h2>
      {stored ? (
        <div className="flex flex-col gap-2">
          <div><strong>Name:</strong> {stored.name || stored.fullname || '—'}</div>
          <div><strong>Email:</strong> {stored.email || '—'}</div>
          <div className="text-sm text-gray-500">JWT payload shown; backend should return user info on protected endpoint for more details.</div>
        </div>
      ) : (
        <div>No user info available</div>
      )}
    </div>
  )
}
