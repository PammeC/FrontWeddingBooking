"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Reservation {
  id: string
  clientName: string
  eventDate: string
  totalPrice: number
}

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    // Fetch reservations from API or localStorage
    const savedReservations = localStorage.getItem("reservations")
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations))
    }
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre del Cliente</TableHead>
          <TableHead>Fecha del Evento</TableHead>
          <TableHead>Precio Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.id}</TableCell>
            <TableCell>{reservation.clientName}</TableCell>
            <TableCell>{new Date(reservation.eventDate).toLocaleDateString()}</TableCell>
            <TableCell>${reservation.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

