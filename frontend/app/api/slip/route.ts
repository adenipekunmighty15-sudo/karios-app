import { prisma } from "@backend/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId query parameter" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Slip for ${user.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .slip { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
          .actions { max-width: 600px; margin: 20px auto; text-align: center; }
          .actions button { padding: 8px 16px; margin: 0 6px; cursor: pointer; }
          @media print { .actions { display: none; } }
        </style>
      </head>
      <body>
        <div class="slip">
          <div class="header">
            <h2>Payment Slip</h2>
            <p>Karios Dashboard</p>
          </div>
          <div>
            <p><strong>Customer:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Status:</strong> ${user.status}</p>
            <p><strong>Orders:</strong> ${user.orders?.length || 0}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="footer">
            <p>This is a system-generated slip from Karios Dashboard.</p>
            <p>&copy; ${new Date().getFullYear()} Karios Technologies</p>
          </div>
        </div>
        <div class="actions">
          <button onclick="window.print()">Print / Save as PDF</button>
        </div>
      </body>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    )
  } catch (error) {
    console.error("Error generating slip:", error)
    return NextResponse.json(
      { error: "Failed to generate slip" },
      { status: 500 }
    )
  }
}
