declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const LOCAL_KEY = "kairos_analytics_events"

function recordLocally(name: string, params: Record<string, string | number>) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as unknown[]
    const event = { name, params, timestamp: new Date().toISOString() }
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...existing.slice(-99), event]))
  } catch {
    // Analytics must never block the event experience.
  }
}

export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

  if (measurementId && !window.gtag) {
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
    window.gtag("js", new Date())
    window.gtag("config", measurementId)

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  trackEvent("page_view", { page_path: window.location.pathname })
}

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  recordLocally(name, params)
  window.gtag?.("event", name, params)
}
