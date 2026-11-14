"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    const input = (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (!leftIcon) return input

    return (
      <div className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center">
          {leftIcon}
        </span>
        {input}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
