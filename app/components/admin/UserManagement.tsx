"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchUsers, createUser, updateUser, deleteUser } from "@/app/services/api"

interface User {
  id: string
  name: string
  email: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const fetchedUsers = await fetchUsers()
      setUsers(fetchedUsers)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    try {
      await createUser(newUser)
      await loadUsers()
      setNewUser({ name: "", email: "", password: "" })
      setIsCreateDialogOpen(false)
      toast({
        title: "Éxito",
        description: "Usuario creado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el usuario",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return

    try {
      await updateUser(editingUser.id, { name: editingUser.name, email: editingUser.email })
      await loadUsers()
      setEditingUser(null)
      setIsEditDialogOpen(false)
      toast({
        title: "Éxito",
        description: "Usuario actualizado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el usuario",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id)
      await loadUsers()
      toast({
        title: "Éxito",
        description: "Usuario eliminado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Cargando usuarios...</div>
  }

  return (
    <div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Crear Usuario</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <Button onClick={handleCreateUser}>Crear</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nombre"
              value={editingUser?.name}
              onChange={(e) => setEditingUser({ ...editingUser!, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={editingUser?.email}
              onChange={(e) => setEditingUser({ ...editingUser!, email: e.target.value })}
            />
            <Button onClick={handleUpdateUser}>Actualizar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setEditingUser(user)
                    setIsEditDialogOpen(true)
                  }}
                >
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
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

