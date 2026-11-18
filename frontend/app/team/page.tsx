import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { prisma } from "@backend/lib/prisma"
import { ShieldCheck, Clock, WifiOff } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function TeamPage() {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  })

  const activeCount = users.filter((u) => u.status === "ACTIVE").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-muted/50 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Team</h1>
              <p className="text-muted-foreground">
                Manage your team members and their roles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCount}</div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Invites Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white bg-muted">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
                        member.status === "ACTIVE"
                          ? "bg-green-500"
                          : member.status === "AWAY"
                          ? "bg-orange-500"
                          : "bg-muted"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.status === "ACTIVE" && (
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                      )}
                      {member.status === "AWAY" && (
                        <Clock className="w-4 h-4 text-orange-500" />
                      )}
                      {member.status === "OFFLINE" && (
                        <WifiOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
