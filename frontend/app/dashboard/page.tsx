import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { DollarSign, User, Package, TrendingUp } from "lucide-react"
import { prisma } from "@backend/lib/prisma"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [totalRevenue, activeUsers, totalOrders, recentOrders] =
    await Promise.all([
      prisma.order.aggregate({ _sum: { amount: true } }),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.order.count(),
      prisma.order.findMany({
        include: { user: true },
        orderBy: { date: "desc" },
        take: 5,
      }),
    ])

  const previousMonthRevenue = await prisma.order.aggregate({
    _sum: { amount: true },
    where: {
      date: {
        lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  })

  const revenueChange = previousMonthRevenue._sum.amount
    ? Number(
        (
          ((Number(totalRevenue._sum.amount || 0) -
            Number(previousMonthRevenue._sum.amount || 0)) /
            Number(previousMonthRevenue._sum.amount)) *
          100
        ).toFixed(1)
      )
    : 0

  const stats = [
    {
      title: "Total Revenue",
      value: `$${Number(totalRevenue._sum.amount || 0).toLocaleString()}`,
      trend: (revenueChange >= 0 ? "up" : "down") as "up" | "down",
      trendValue: `${Math.abs(revenueChange)}%`,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Active Users",
      value: activeUsers.toLocaleString(),
      trend: "up" as const,
      trendValue: "3.2%",
      icon: <User className="w-5 h-5" />,
    },
    {
      title: "Orders",
      value: totalOrders.toLocaleString(),
      trend: "down" as const,
      trendValue: "2.1%",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      trend: "up" as const,
      trendValue: "0.4%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-muted/50 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, Sarah. Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-foreground">System operational</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white bg-muted">
                          {order.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {order.orderId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.user.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          ${Number(order.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.date.toISOString().split("T")[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent text-left text-sm font-medium transition-colors">
                  New Project
                  <TrendingUp className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent text-left text-sm font-medium transition-colors">
                  Add Team Member
                  <User className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent text-left text-sm font-medium transition-colors">
                  Export Report
                  <Package className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background hover:bg-accent text-left text-sm font-medium transition-colors">
                  View Analytics
                  <TrendingUp className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
