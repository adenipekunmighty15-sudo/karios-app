import { NextResponse } from "next/server"

export async function GET() {
  const stats = [
    { title: "Total Revenue", value: "$84,529", subtitle: "vs last month", trend: "up", trendValue: "12.5%" },
    { title: "Active Users", value: "12,450", subtitle: "vs last month", trend: "up", trendValue: "3.2%" },
    { title: "Orders", value: "3,842", subtitle: "vs last month", trend: "down", trendValue: "2.1%" },
    { title: "Conversion", value: "4.2%", subtitle: "vs last month", trend: "up", trendValue: "0.4%" },
  ]

  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7000 },
    { name: "May", revenue: 6000 },
    { name: "Jun", revenue: 9000 },
    { name: "Jul", revenue: 11000 },
    { name: "Aug", revenue: 9500 },
    { name: "Sep", revenue: 12000 },
    { name: "Oct", revenue: 14000 },
    { name: "Nov", revenue: 16000 },
    { name: "Dec", revenue: 18000 },
  ]

  const recentOrders = [
    { id: "#INV-001", customer: "Sarah Chen", amount: "$240", status: "Delivered", date: "2 hours ago" },
    { id: "#INV-002", customer: "Marcus Ruiz", amount: "$180", status: "Processing", date: "5 hours ago" },
    { id: "#INV-003", customer: "Elena Petrova", amount: "$320", status: "Pending", date: "1 day ago" },
    { id: "#INV-004", customer: "David Kim", amount: "$450", status: "Delivered", date: "2 days ago" },
    { id: "#INV-005", customer: "Lisa Wong", amount: "$150", status: "Cancelled", date: "3 days ago" },
  ]

  const projects = [
    { name: "Website Redesign", progress: 75, status: "active", due: "Oct 15" },
    { name: "Mobile App v2", progress: 45, status: "active", due: "Nov 1" },
    { name: "API Migration", progress: 90, status: "review", due: "Oct 20" },
    { name: "Dashboard Analytics", progress: 30, status: "planning", due: "Dec 1" },
  ]

  const teamMembers = [
    { name: "Sarah Chen", role: "Product Manager", avatar: "SC", status: "active" },
    { name: "Marcus Ruiz", role: "Senior Developer", avatar: "MR", status: "active" },
    { name: "Elena Petrova", role: "UX Designer", avatar: "EP", status: "away" },
    { name: "David Kim", role: "DevOps Engineer", avatar: "DK", status: "active" },
    { name: "Lisa Wong", role: "Marketing Lead", avatar: "LW", status: "offline" },
  ]

  return NextResponse.json({ stats, revenueData, recentOrders, projects, teamMembers })
}
