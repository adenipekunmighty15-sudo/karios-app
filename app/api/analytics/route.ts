import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
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

  return NextResponse.json({ revenueData, ordersData })
}
