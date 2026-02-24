import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: __dirname,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.harpersbazaar.co.id",
      },
      {
        protocol: "https",
        hostname: "pglacxrohfpjskdmhjxs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "st3.depositphotos.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // ✅ TAMBAHKAN INI
      },
    ],
  },

  compress: true,
  poweredByHeader: false,
}

export default nextConfig