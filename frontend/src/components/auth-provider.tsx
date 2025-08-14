"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  name: string
  email: string
  role: string
  loginMethod: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const isLoggedIn = localStorage.getItem("isLoggedIn")
        const userData = localStorage.getItem("user")

        if (isLoggedIn === "true" && userData) {
          try {
            setUser(JSON.parse(userData))
          } catch (error) {
            console.error("Error parsing user data:", error)
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("user")
          }
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
