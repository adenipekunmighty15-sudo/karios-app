"use client"

import * as React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  trend?: "up" | "down" | "none"
  trendValue?: string
  icon?: React.ReactNode
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0 pb-2.5">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
      {trend && trendValue && (
        <CardFooter>
          <div className="flex items-center gap-x-1">
            <TrendIcon className="h-3 w-3" />
            <span className="text-xs font-medium">
              {trend === "up" ? "+" : "-"}{trendValue}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
