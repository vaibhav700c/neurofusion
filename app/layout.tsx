import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeuroFusion'25 - Where Innovation Meets Intelligence",
  description: "Join NeuroFusion'25, the ultimate hackathon bringing together the brightest minds in AI, machine learning, and technology innovation. Organized by BaldMann and University of Jammu.",
  keywords: "NeuroFusion, hackathon, AI, machine learning, innovation, technology, BaldMann, University of Jammu, programming, competition",
  authors: [{ name: "BaldMann & University of Jammu" }],
  creator: "NeuroFusion'25 Team",
  publisher: "BaldMann & University of Jammu",
  openGraph: {
    title: "NeuroFusion'25 - Where Innovation Meets Intelligence",
    description: "Join the ultimate AI and technology hackathon. Compete, innovate, and create the future.",
    type: "website",
    locale: "en_US",
    siteName: "NeuroFusion'25",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroFusion'25 - Where Innovation Meets Intelligence",
    description: "Join the ultimate AI and technology hackathon. Compete, innovate, and create the future.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
