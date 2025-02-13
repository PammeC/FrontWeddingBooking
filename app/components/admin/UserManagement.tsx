"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: "", email: "" })
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch users from API
    // For now, we'll use mock data
    setUsers([
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
    ])
  }, [])

  const handleCreateUser = () => {
    // API call to create user
    const createdUser = { ...newUser, id: Date.now().toString() }
    setUsers([...users, createdUser])
    setNewUser({ name: "", email: "" })
  }

  const handleUpdateUser = () => {
    if (editingUser) {
      // API call to update user
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
      setEditingUser(null)
    }
  }

  const handleDeleteUser = (id: string) => {
    // API call to delete user
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div>
      <Dialog>
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
            <Button onClick={handleCreateUser}>Crear</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingUser(user)}>
                      Editar
                    </Button>
                  </DialogTrigger>
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

