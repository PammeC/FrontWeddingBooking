"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Wedding Services
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}</span>
              <Button variant="secondary" onClick={logout}>
                Log Out
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="secondary">Log In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
