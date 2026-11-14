import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  })

  return NextResponse.json({
    team: users.map((u) => ({
      name: u.name,
      role: u.role,
      avatar: u.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      status: u.status,
    })),
  })
}
