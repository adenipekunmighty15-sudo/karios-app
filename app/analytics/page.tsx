import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { prisma } from "@/lib/prisma"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"

export default async function AnalyticsPage() {
  const events = await prisma.analyticsEvent.findMany({
    orderBy: { date: "asc" },
  })

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]

  const revenueData = months.map((month) => {
    const event = events.find(
      (e) => e.name === "Revenue" && e.date.toLocaleString("default", { month: "short" }) === month
    )
    return { name: month, revenue: event ? event.value : 0 }
  })

  const ordersData = months.map((month) => {
    const event = events.find(
      (e) => e.name === "Orders" && e.date.toLocaleString("default", { month: "short" }) === month
    )
    return { name: month, orders: event ? event.value : 0 }
  })

  const totalRevenue = revenueData.reduce((acc, cur) => acc + cur.revenue, 0)
  const totalOrders = ordersData.reduce((acc, cur) => acc + cur.orders, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-muted/50 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">
                Track your business performance and growth metrics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Orders Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ordersData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="orders"
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  From database
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{totalOrders.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  From database
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg. Order Value</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">
                  ${
                    totalOrders > 0
                      ? (totalRevenue / totalOrders).toFixed(2)
                      : 0
                  }
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Calculated from real data
                </span>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
