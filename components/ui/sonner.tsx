"use client"

import { ToastProvider, ToastViewport } from "sonner"

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport
        position="top-right"
        richColors
        closeButton={{ label: "Close" }}
        className="pointer-events-auto w-[412px]"
        toastOptions={{
          classNames: {
            toast: "group bg-background border border-border text-foreground shadow-lg",
            description: "text-muted-foreground",
            actionButton: "bg-primary text-primary-foreground",
            cancelButton: "text-muted-foreground hover:text-destructive",
          },
        }}
      />
    </ToastProvider>
  )
}
