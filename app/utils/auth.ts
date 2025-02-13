import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  id: string
  username: string
  role: "admin" | "user"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    } else {
      router.push("/login")
    }
  }, [router])

  return user
}

export function useAdminAuth() {
  const user = useAuth()
  const router = useRouter() // Added router import here

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/")
    }
  }, [user]) // Removed router from dependencies

  return user && user.role === "admin"
}

