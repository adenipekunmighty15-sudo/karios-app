const { PrismaClient } = require("@prisma/client")
const p = new PrismaClient()

async function main() {
  const users = await p.user.count()
  const projects = await p.project.count()
  const orders = await p.order.count()
  const analytics = await p.analyticsEvent.count()
  console.log("Users:", users)
  console.log("Projects:", projects)
  console.log("Orders:", orders)
  console.log("Analytics events:", analytics)

  const sampleUsers = await p.user.findMany({ take: 3, select: { name: true, email: true, role: true } })
  console.log("Sample users:", sampleUsers)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => p.$disconnect())
