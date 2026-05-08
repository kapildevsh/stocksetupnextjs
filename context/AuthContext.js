'use client'

import { createContext, useContext, useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check login status
const fetchUser = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    })

    if (res.status === 401) {
      setUser(null)
      setLoading(false)
      return
    }

    const data = await res.json()
    setUser(data)

  } catch (error) {
    console.error("Auth check failed:", error)
  }

  setLoading(false)
}

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = async () => {

    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    })

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)