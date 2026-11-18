import type { Metadata } from "next"
import { DM_Sans, Italiana } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
})

export const metadata: Metadata = {
  title: "KAIROS — God's Appointed Time",
  description: "Join McPherson University Prays for KAIROS on 28 November 2026.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${italiana.variable}`}>{children}</body>
    </html>
  )
}
