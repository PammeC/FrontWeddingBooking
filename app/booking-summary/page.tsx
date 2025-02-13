"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BookingService {
  category: string
  name: string
  price: number
}

interface Booking {
  clientName: string
  eventDate: string
  location: string
  services: BookingService[]
  total: number
}

export default function BookingSummary() {
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)

  useEffect(() => {
    const savedBooking = localStorage.getItem("currentBooking")
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking))
    }
  }, [])

  if (!booking) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Orden #1 - {booking.clientName}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Fecha del evento:</p>
              <p className="font-medium">{new Date(booking.eventDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ubicación:</p>
              <p className="font-medium">{booking.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado:</p>
              <p className="font-medium">Confirmada</p>
            </div>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Servicio</th>
                  <th className="px-4 py-2 text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {booking.services.map((service, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="px-4 py-2 capitalize">{service.name}</td>
                    <td className="px-4 py-2 text-right">${service.price}</td>
                  </tr>
                ))}
                <tr className="bg-muted">
                  <td className="px-4 py-2 font-bold">Total</td>
                  <td className="px-4 py-2 text-right font-bold">${booking.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

