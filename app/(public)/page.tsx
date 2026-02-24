import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import ArticleCard from "@/components/ArticleCard"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  title: "Ruang Publik — Opini, Analisis & Tulisan",
  description:
    "Baca artikel opini, analisis mendalam, dan tulisan pribadi tentang berbagai topik menarik di Ruang Publik.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Ruang Publik — Opini, Analisis & Tulisan",
    description:
      "Baca artikel opini, analisis mendalam, dan tulisan pribadi tentang berbagai topik menarik di Ruang Publik.",
    url: baseUrl,
    type: "website",
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(12)

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  const featured = articles?.[0]
  const rest = articles?.slice(1) ?? []

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Ruang Publik",
            url: baseUrl,
          }),
        }}
      />

      {/* ================= FEATURED ================= */}
      {featured && (
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              {featured.thumbnail_url && (
                <Image
                  src={featured.thumbnail_url}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {featured.title}
              </h1>

              {featured.published_at && (
                <p className="text-sm text-muted-foreground">
                  {new Date(
                    featured.published_at
                  ).toLocaleDateString("id-ID")}
                </p>
              )}

              {featured.excerpt && (
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {featured.excerpt}
                </p>
              )}

              <Link
                href={`/artikel/${featured.slug}`}
                className="inline-block text-sm font-semibold text-primary hover:underline"
              >
                Baca selengkapnya →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= CATEGORY FILTER ================= */}
      {categories && categories.length > 0 && (
        <nav className="flex flex-wrap gap-3 mb-14">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 text-sm font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      )}

      {/* ================= ARTICLE GRID ================= */}
      {rest.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold mb-3">
            Belum Ada Artikel
          </h2>
          <p className="text-muted-foreground">
            Artikel akan segera hadir. Nantikan!
          </p>
        </div>
      )}
    </>
  )
}