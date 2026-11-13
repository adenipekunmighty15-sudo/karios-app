import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create users
  const sarah = await prisma.user.upsert({
    where: { email: "sarah@example.com" },
    update: {},
    create: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
  })

  const marcus = await prisma.user.upsert({
    where: { email: "marcus@example.com" },
    update: {},
    create: {
      name: "Marcus Ruiz",
      email: "marcus@example.com",
      role: "DEVELOPER",
      status: "ACTIVE",
    },
  })

  const elena = await prisma.user.upsert({
    where: { email: "elena@example.com" },
    update: {},
    create: {
      name: "Elena Petrova",
      email: "elena@example.com",
      role: "DESIGNER",
      status: "AWAY",
    },
  })

  const david = await prisma.user.upsert({
    where: { email: "david@example.com" },
    update: {},
    create: {
      name: "David Kim",
      email: "david@example.com",
      role: "ENGINEER",
      status: "ACTIVE",
    },
  })

  const lisa = await prisma.user.upsert({
    where: { email: "lisa@example.com" },
    update: {},
    create: {
      name: "Lisa Wong",
      email: "lisa@example.com",
      role: "MARKETING",
      status: "OFFLINE",
    },
  })

  // Create projects
  await prisma.project.upsert({
    where: { id: "proj-website-redesign" },
    update: {},
    create: {
      id: "proj-website-redesign",
      name: "Website Redesign",
      description: "Complete overhaul of the company website",
      progress: 75,
      status: "ACTIVE",
      dueDate: new Date("2024-10-15"),
      ownerId: sarah.id,
    },
  })

  await prisma.project.upsert({
    where: { id: "proj-mobile-app-v2" },
    update: {},
    create: {
      id: "proj-mobile-app-v2",
      name: "Mobile App v2",
      description: "Next generation mobile application",
      progress: 45,
      status: "ACTIVE",
      dueDate: new Date("2024-11-01"),
      ownerId: marcus.id,
    },
  })

  await prisma.project.upsert({
    where: { id: "proj-api-migration" },
    update: {},
    create: {
      id: "proj-api-migration",
      name: "API Migration",
      description: "Migrate legacy APIs to GraphQL",
      progress: 90,
      status: "REVIEW",
      dueDate: new Date("2024-10-20"),
      ownerId: david.id,
    },
  })

  await prisma.project.upsert({
    where: { id: "proj-dashboard-analytics" },
    update: {},
    create: {
      id: "proj-dashboard-analytics",
      name: "Dashboard Analytics",
      description: "Real-time analytics dashboard",
      progress: 30,
      status: "PLANNING",
      dueDate: new Date("2024-12-01"),
      ownerId: elena.id,
    },
  })

  await prisma.project.upsert({
    where: { id: "proj-ecommerce" },
    update: {},
    create: {
      id: "proj-ecommerce",
      name: "E-commerce Integration",
      description: "Integrate payment gateway and catalog",
      progress: 60,
      status: "ACTIVE",
      dueDate: new Date("2024-10-25"),
      ownerId: lisa.id,
    },
  })

  // Create orders
  const orders = [
    { orderId: "INV-001", customer: "Sarah Chen", amount: 240.0, status: "DELIVERED", userId: sarah.id },
    { orderId: "INV-002", customer: "Marcus Ruiz", amount: 180.0, status: "PROCESSING", userId: marcus.id },
    { orderId: "INV-003", customer: "Elena Petrova", amount: 320.0, status: "PENDING", userId: elena.id },
    { orderId: "INV-004", customer: "David Kim", amount: 450.0, status: "DELIVERED", userId: david.id },
    { orderId: "INV-005", customer: "Lisa Wong", amount: 150.0, status: "CANCELLED", userId: lisa.id },
    { orderId: "INV-006", customer: "Sarah Chen", amount: 280.0, status: "DELIVERED", userId: sarah.id },
    { orderId: "INV-007", customer: "Marcus Ruiz", amount: 190.0, status: "PROCESSING", userId: marcus.id },
    { orderId: "INV-008", customer: "Elena Petrova", amount: 410.0, status: "PENDING", userId: elena.id },
  ]

  for (const order of orders) {
    await prisma.order.upsert({
      where: { orderId: order.orderId },
      update: {},
      create: order,
    })
  }

  // Create analytics events
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const revenueValues = [4000, 3000, 5000, 7000, 6000, 9000, 11000, 9500, 12000, 14000, 16000, 18000]
  const ordersValues = [2400, 1800, 3200, 4100, 3900, 5200, 6100, 5400, 6500, 7200, 8500, 9200]

  for (let i = 0; i < months.length; i++) {
    await prisma.analyticsEvent.upsert({
      where: { id: `rev-${months[i]}` },
      update: {},
      create: {
        id: `rev-${months[i]}`,
        name: "Revenue",
        value: revenueValues[i],
        date: new Date(`2024-${String(i + 1).padStart(2, "0")}-01`),
      },
    })

    await prisma.analyticsEvent.upsert({
      where: { id: `ord-${months[i]}` },
      update: {},
      create: {
        id: `ord-${months[i]}`,
        name: "Orders",
        value: ordersValues[i],
        date: new Date(`2024-${String(i + 1).padStart(2, "0")}-01`),
      },
    })
  }

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
