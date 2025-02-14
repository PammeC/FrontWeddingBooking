"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  createCateringService,
  createMusicService,
  createDecorationService,
  createPhotographyService,
  fetchCateringServices,
  fetchMusicServices,
  fetchDecorationServices,
  fetchPhotographyServices,
  updateCateringService,
  updateMusicService,
  updateDecorationService,
  updatePhotographyService,
  deleteCateringService,
  deleteMusicService,
  deleteDecorationService,
  deletePhotographyService,
} from "@/app/services/api"

interface Service {
  id_catering?: string
  id_music?: string
  id_decoration?: string
  id_photograhy?: string
  name: string
  price: number
  category: "catering" | "music" | "decoration" | "photography"
}

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    price: 0,
    category: "catering",
  })
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const loadServices = async () => {
    try {
      setLoading(true)
      const [catering, music, decoration, photography] = await Promise.all([
        fetchCateringServices(),
        fetchMusicServices(),
        fetchDecorationServices(),
        fetchPhotographyServices(),
      ])

      const formattedServices = [
        ...catering.map((s: any) => ({ ...s, category: "catering" })),
        ...music.map((s: any) => ({ ...s, category: "music" })),
        ...decoration.map((s: any) => ({ ...s, category: "decoration" })),
        ...photography.map((s: any) => ({ ...s, category: "photography" })),
      ]

      setServices(formattedServices)
    } catch (error) {
      console.error("Error loading services:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los servicios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleCreateService = async () => {
    try {
      let response
      switch (newService.category) {
        case "catering":
          response = await createCateringService(newService)
          break
        case "music":
          response = await createMusicService(newService)
          break
        case "decoration":
          response = await createDecorationService(newService)
          break
        case "photography":
          response = await createPhotographyService(newService)
          break
      }

      await loadServices()
      setNewService({ name: "", price: 0, category: "catering" })
      setIsDialogOpen(false)
      toast({
        title: "Éxito",
        description: "Servicio creado correctamente",
      })
    } catch (error) {
      console.error("Error creating service:", error)
      toast({
        title: "Error",
        description: "No se pudo crear el servicio",
        variant: "destructive",
      })
    }
  }

  const handleUpdateService = async () => {
    if (!editingService) return

    try {
      const { name, price } = editingService
      const updateData = { name, price }

      switch (editingService.category) {
        case "catering":
          await updateCateringService(editingService.id_catering!, updateData)
          break
        case "music":
          await updateMusicService(editingService.id_music!, updateData)
          break
        case "decoration":
          await updateDecorationService(editingService.id_decoration!, updateData)
          break
        case "photography":
          await updatePhotographyService(editingService.id_photograhy!, updateData)
          break
      }

      await loadServices()
      setEditingService(null)
      setIsEditDialogOpen(false)
      toast({
        title: "Éxito",
        description: "Servicio actualizado correctamente",
      })
    } catch (error) {
      console.error("Error updating service:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el servicio",
        variant: "destructive",
      })
    }
  }

  const handleDeleteService = async (service: Service) => {
    try {
      switch (service.category) {
        case "catering":
          await deleteCateringService(service.id_catering!)
          break
        case "music":
          await deleteMusicService(service.id_music!)
          break
        case "decoration":
          await deleteDecorationService(service.id_decoration!)
          break
        case "photography":
          await deletePhotographyService(service.id_photograhy!)
          break
      }

      await loadServices()
      toast({
        title: "Éxito",
        description: "Servicio eliminado correctamente",
      })
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el servicio",
        variant: "destructive",
      })
    }
  }

  const getServiceId = (service: Service) => {
    switch (service.category) {
      case "catering":
        return service.id_catering
      case "music":
        return service.id_music
      case "decoration":
        return service.id_decoration
      case "photography":
        return service.id_photograhy
      default:
        return ""
    }
  }

  if (loading) {
    return <div>Cargando servicios...</div>
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
            <Button onClick={handleUpdateService}>Actualizar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={getServiceId(service)}>
              <TableCell>{getServiceId(service)}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setEditingService(service)
                    setIsEditDialogOpen(true)
                  }}
                >
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteService(service)}>
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

