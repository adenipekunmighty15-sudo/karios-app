import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Generate a simple slip as text content
    const slipText = generateSlipContent(user)
    
    // Return as a downloadable text file (simplified slip)
    const blob = new Blob([slipText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    
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
            <p>© ${new Date().getFullYear()} Karios Technologies</p>
          </div>
        </div>
        <button onclick="window.print()">Print</button>
        <button onclick="window.print(); window.close()">Save as PDF</button>
      </body>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
          "Content-Disposition": `attachment; filename=slip-${user.name}.txt`,
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

function generateSlipContent(user: any): string {
  return `PAYMENT SLIP
===========
Karios Dashboard

Customer: ${user.name}
Email: ${user.email}
Status: ${user.status}
Orders: ${user.orders?.length || 0}
Date: ${new Date().toLocaleDateString()}

This is a system-generated slip from Karios Dashboard.
© ${new Date().getFullYear()} Karios Technologies
`
}