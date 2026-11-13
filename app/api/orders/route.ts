import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { user: true },
    orderBy: { date: "desc" },
    take: 20,
  })

  return NextResponse.json({
    orders: orders.map((o) => ({
      id: o.orderId,
      customer: o.customer,
      amount: `$${Number(o.amount).toLocaleString()}`,
      status: o.status,
      date: o.date.toISOString(),
      user: o.user.name,
    })),
  })
}
