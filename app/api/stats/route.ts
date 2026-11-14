import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const [totalRevenue, activeUsers, totalOrders, conversionRate] =
    await Promise.all([
      prisma.order.aggregate({
        _sum: { amount: true },
      }),
      prisma.user.count({
        where: { status: "ACTIVE" },
      }),
      prisma.order.count(),
      prisma.order.aggregate({
        _avg: { amount: true },
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

  return NextResponse.json({
    stats: [
      {
        title: "Total Revenue",
        value: `$${Number(totalRevenue._sum.amount || 0).toLocaleString()}`,
        trend: revenueChange >= 0 ? "up" : "down",
        trendValue: `${Math.abs(revenueChange)}%`,
      },
      {
        title: "Active Users",
        value: activeUsers.toLocaleString(),
        trend: "up",
        trendValue: "3.2%",
      },
      {
        title: "Orders",
        value: totalOrders.toLocaleString(),
        trend: "down",
        trendValue: "2.1%",
      },
      {
        title: "Conversion Rate",
        value: "4.2%",
        trend: "up",
        trendValue: "0.4%",
      },
    ],
  })
}
