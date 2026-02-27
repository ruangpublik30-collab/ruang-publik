import "./globals.css"
import Navbar from "@/components/Navbar"
import { Playfair_Display } from "next/font/google"
import type { Metadata } from "next"
import RunningText from "@/components/RunningText"
import Footer from "@/components/Footer";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

/* =========================
   GLOBAL METADATA
========================= */

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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "Ruang Publik",
    title: "Ruang Publik",
    description:
      "Portal opini dan analisis isu sosial, ekonomi, dan spiritual.",
    url: "https://ruangpublik.fun",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ruang Publik",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ruang Publik",
    description:
      "Portal opini dan analisis isu sosial, ekonomi, dan spiritual.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },

  // ✅ INI YANG MENYELESAIKAN ERROR fb:app_id
  other: {
    "fb:app_id": "1234567890",
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">

        {/* ================= HEADER FIXED WRAPPER ================= */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
          <RunningText />
        </div>

        {/* Spacer sesuai tinggi Navbar + RunningText */}
        <div className="h-[50px]" />

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ================= FOOTER ================= */}
        <Footer />

        {/* ================= ORGANIZATION SCHEMA ================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ruang Publik",
              url: "https://ruangpublik.fun",
              logo: "https://ruangpublik.fun/logo.png",
              sameAs: [
                "https://twitter.com/ruangpublik",
                "https://facebook.com/SidiqMuhammad"
              ],
            }),
          }}
        />

      </body>
    </html>
  );
}