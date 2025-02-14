"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

interface User {
  id: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Comprobar si hay un usuario en localStorage al cargar la página
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Aquí normalmente harías una llamada a una API para autenticar
    // Por ahora, simularemos una autenticación simple
    if (email === "user@example.com" && password === "password") {
      const newUser: User = { id: "1", name: "Usuario", role: "user" }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } else if (email === "admin@example.com" && password === "adminpass") {
      const newUser: User = { id: "2", name: "Administrador", role: "admin" }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

