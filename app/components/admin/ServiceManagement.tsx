"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Service {
  id: string
  name: string
  price: number
  category: "catering" | "music" | "decoration" | "photography"
}

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [newService, setNewService] = useState<Omit<Service, "id">>({ name: "", price: 0, category: "catering" })
  const [editingService, setEditingService] = useState<Service | null>(null)

  useEffect(() => {
    // Fetch services from API
    // For now, we'll use mock data
    setServices([
      { id: "1", name: "Buffet Clásico", price: 2000, category: "catering" },
      { id: "2", name: "DJ Profesional", price: 800, category: "music" },
      { id: "3", name: "Decoración Romántica", price: 1500, category: "decoration" },
      { id: "4", name: "Paquete Básico", price: 1200, category: "photography" },
    ])
  }, [])

  const handleCreateService = () => {
    // API call to create service
    const createdService = { ...newService, id: Date.now().toString() }
    setServices([...services, createdService])
    setNewService({ name: "", price: 0, category: "catering" })
  }

  const handleUpdateService = () => {
    if (editingService) {
      // API call to update service
      setServices(services.map((service) => (service.id === editingService.id ? editingService : service)))
      setEditingService(null)
    }
  }

  const handleDeleteService = (id: string) => {
    // API call to delete service
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Crear Servicio</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Servicio</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nombre"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Precio"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
            />
            <Select
              value={newService.category}
              onValueChange={(value: "catering" | "music" | "decoration" | "photography") =>
                setNewService({ ...newService, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="catering">Catering</SelectItem>
                <SelectItem value="music">Música</SelectItem>
                <SelectItem value="decoration">Decoración</SelectItem>
                <SelectItem value="photography">Fotografía</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreateService}>Crear</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingService(service)}>
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Servicio</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        placeholder="Nombre"
                        value={editingService?.name}
                        onChange={(e) => setEditingService({ ...editingService!, name: e.target.value })}
                      />
                      <Input
                        type="number"
                        placeholder="Precio"
                        value={editingService?.price}
                        onChange={(e) => setEditingService({ ...editingService!, price: Number(e.target.value) })}
                      />
                      <Select
                        value={editingService?.category}
                        onValueChange={(value: "catering" | "music" | "decoration" | "photography") =>
                          setEditingService({ ...editingService!, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="catering">Catering</SelectItem>
                          <SelectItem value="music">Música</SelectItem>
                          <SelectItem value="decoration">Decoración</SelectItem>
                          <SelectItem value="photography">Fotografía</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleUpdateService}>Actualizar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDeleteService(service.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

