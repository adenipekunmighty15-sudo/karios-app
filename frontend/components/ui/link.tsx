"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-primary underline-offset-4 hover:underline cursor-pointer",
      className
    )}
    {...props}
  />
))
Link.displayName = "Link"

export { Link }
