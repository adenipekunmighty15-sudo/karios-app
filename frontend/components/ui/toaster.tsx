"use client"

import * as React from "react"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="pointer-events-none fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px]">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          role="status"
          className={`pointer-events-auto relative w-full rounded-lg border p-4 pr-10 shadow-lg ${
            variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border bg-background text-foreground"
          }`}
        >
          {title ? <div className="text-sm font-semibold">{title}</div> : null}
          {description ? (
            <div className="mt-1 text-sm opacity-90">{description}</div>
          ) : null}
          <button
            type="button"
            onClick={() => dismiss(id)}
            aria-label="Close"
            className="absolute right-2 top-2 rounded-md p-1 text-current opacity-60 transition-opacity hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
