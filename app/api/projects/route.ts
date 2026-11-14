import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { owner: true },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json({
    projects: projects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      progress: p.progress,
      status: p.status,
      dueDate: p.dueDate?.toISOString() || "",
      owner: p.owner.name,
    })),
  })
}
