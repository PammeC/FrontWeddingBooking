"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

// Datos quemados para el administrador y usuarios
const users = [
  { id: "admin", username: "admin", password: "admin123", role: "admin" },
  { id: "user1", username: "user1", password: "user123", role: "user" },
  { id: "user2", username: "user2", password: "user456", role: "user" },
]

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Guardar información de sesión
      localStorage.setItem("currentUser", JSON.stringify({ id: user.id, username: user.username, role: user.role }))

      // Redirigir según el rol
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SCYAhj8XRN8vGrjsfUXecv4gnaVohg.png"
          alt="Wedding ceremony setup in woods"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 relative z-10 bg-background/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bienvenido a Wedding Services</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

