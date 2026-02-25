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

  description:
    "Ruang Publik adalah portal opini, analisis, dan refleksi yang membahas isu sosial, ekonomi, dan spiritual secara mendalam.",

  keywords: [
    "artikel",
    "opini",
    "analisis",
    "refleksi",
    "berita",
    "ruang publik",
  ],

  authors: [{ name: "Ruang Publik" }],

  openGraph: {
    type: "website",
    siteName: "Ruang Publik",
    title: "Ruang Publik",
    description:
      "Portal opini dan analisis isu sosial, ekonomi, dan spiritual.",
    url: "https://ruangpublik.fun",
    locale: "id_ID",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ruang Publik",
    description:
      "Portal opini dan analisis isu sosial, ekonomi, dan spiritual.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
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