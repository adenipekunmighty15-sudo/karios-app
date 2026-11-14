"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface UserRow {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
}

interface TableRowData {
  [key: string]: string | number
  name: string
  email: string
  role: string
  status: string
  joined: string
  userId: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminName, setAdminName] = useState("Guest")
  const { toast } = useToast()

  // Check admin role on mount (client-only)
  useEffect(() => {
    const userStr = localStorage.getItem("kariosUser")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setIsAdmin(user.role === "ADMIN")
        setAdminName(user.name || "Guest")
      } catch {
        setIsAdmin(false)
      }
    }
  }, [])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/users", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch users")
      const data = await res.json()
      setUsers(data.users || [])
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
    } else {
      setLoading(false)
    }
  }, [isAdmin, fetchUsers])

  const downloadSlip = (userId: string) => {
    window.open(`/api/slip?userId=${encodeURIComponent(userId)}`, "_blank")
  }

  const tableData: TableRowData[] = users.map((u) => ({
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-",
    userId: u.id,
  }))

  return (
    <div className="min-h-screen bg-background">
      {isAdmin ? (
        <div>
          <Navbar />
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-muted/50 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
                  <p className="text-muted-foreground">
                    Manage your users and generate slips.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Logged in as: {adminName}
                  </span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    {loading ? (
                      <p className="text-sm text-muted-foreground py-4">Loading users...</p>
                    ) : (
                      <DataTable
                        columns={["Name", "Email", "Role", "Status", "Joined"]}
                        data={tableData}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h2 className="text-xl font-medium mb-4">Generate PDF Slips</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Download slips for registered users with their details.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {users.map((user) => (
                    <Button
                      key={user.id}
                      variant="outline"
                      size="sm"
                      onClick={() => downloadSlip(user.id)}
                    >
                      Download Slip for {user.name}
                    </Button>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-md mx-auto p-8 bg-background/90 rounded-xl border border-border text-center">
            <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
            <p className="text-muted-foreground mb-6">
              You need administrator privileges to access this page.
            </p>
            <Button
              onClick={() => {
                localStorage.setItem(
                  "kariosUser",
                  JSON.stringify({
                    name: "Admin User",
                    email: "admin@karios.com",
                    role: "ADMIN",
                  })
                )
                window.location.reload()
              }}
            >
              Login as Admin
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
