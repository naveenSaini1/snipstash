"use client"
import { useUserContext } from "@/contextApi/UserContext"
import React, { useState } from "react"

/**
 * Login form for SnipStash.
 */
function LoginForm() {
  const { login, error, loading } = useUserContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")
    try {
      await login({ email, password })
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white mb-2">Login</h2>
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Email</label>
        <input
          type="email"
          className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Password</label>
        <input
          type="password"
          className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {(formError || error) && <div className="text-red-400 text-sm">{formError || error}</div>}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

export default LoginForm 