import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create users with roles
  const admin = await prisma.user.upsert({
    where: { email: "admin@karios.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@karios.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: "sarah@example.com" },
    update: {},
    create: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "USER",
      status: "ACTIVE",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "marcus@example.com" },
    update: {},
    create: {
      name: "Marcus Ruiz",
      email: "marcus@example.com",
      role: "USER",
      status: "ACTIVE",
    },
  })

  // Create orders
  const orders = [
    { orderId: "INV-001", customer: "Sarah Chen", amount: 240, status: "DELIVERED", userId: user1.id },
    { orderId: "INV-002", customer: "Marcus Ruiz", amount: 180, status: "PROCESSING", userId: user2.id },
    { orderId: "INV-003", customer: "Admin", amount: 450, status: "DELIVERED", userId: admin.id },
  ]

  for (const order of orders) {
    await prisma.order.upsert({
      where: { orderId: order.orderId },
      update: {},
      create: order,
    })
  }

  console.log("Database seeded successfully!")
  await prisma.$disconnect()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })