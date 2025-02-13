"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserManagement from "../components/admin/UserManagement"
import ServiceManagement from "../components/admin/ServiceManagement"
import ReservationList from "../components/admin/ReservationList"
import { useAdminAuth } from "../utils/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users")
  const isAdmin = useAdminAuth()
  const router = useRouter()

  if (!isAdmin) {
    return null // o un spinner de carga
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("currentUser")
            router.push("/login")
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Crear, leer, actualizar y eliminar usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Servicios</CardTitle>
              <CardDescription>Administrar servicios de catering, música, decoración y fotografía</CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Reservas Guardadas</CardTitle>
              <CardDescription>Ver todas las reservas realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ReservationList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

