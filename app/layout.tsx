import "./globals.css"
import Navbar from "@/components/Navbar"
import { Playfair_Display } from "next/font/google"

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata = {
  title: "Ruang Publik",
  description: "Portal opini dan analisis",
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