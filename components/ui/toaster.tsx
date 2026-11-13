"use client"

import * as React from "react"
import { ToastProvider, ToastViewport } from "sonner"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <ToastAction key={id} {...props} />
        )
      })}
      <ToastViewport position="top-right" />
    </ToastProvider>
  )
}
