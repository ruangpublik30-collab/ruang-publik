import "./globals.css"
import Navbar from "@/components/Navbar"
import { Playfair_Display } from "next/font/google"
import type { Metadata } from "next"

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ruangpublik.fun"),

  title: {
    default: "Ruang Publik",
    template: "%s | Ruang Publik",
  },

  description: "Portal opini dan analisis",

  openGraph: {
    type: "website",
    siteName: "Ruang Publik",
    title: "Ruang Publik",
    description: "Portal opini dan analisis",
    url: "https://ruangpublik.fun",
  },

  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${serif.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}