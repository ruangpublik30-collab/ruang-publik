import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import ArticleCard from "@/components/ArticleCard"

type Article = {
    id: string
    slug: string
    title: string
    excerpt: string | null
    thumbnail_url: string | null
    published_at: string | null
}

type Category = {
    id: string
    name: string
    slug: string
    description: string | null
}

/* =========================
   ✅ SEO (SERVER SIDE)
========================= */
export async function generateMetadata(
    {
        params,
    }: {
        params: Promise<{ slug: string }>
    }
): Promise<Metadata> {

    const { slug } = await params
    const supabase = await createClient()

    const { data: category } = await supabase
        .from("categories")
        .select("name, description, slug")
        .eq("slug", slug)
        .single()

    if (!category) return {}

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruangpublik.fun"
    const url = `${baseUrl}/category/${slug}`

    return {
        title: {
            default: `Kategori: ${category.name}`,
            template: "%s | Ruang Publik",
        },

        description:
            category.description ??
            `Artikel dalam kategori ${category.name}.`,

        alternates: {
            canonical: url,
        },

        openGraph: {
            type: "website",
            siteName: "Ruang Publik",
            title: `Kategori: ${category.name}`,
            description:
                category.description ??
                `Artikel dalam kategori ${category.name}.`,
            url,
            images: [
                {
                    url: "/og-default.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `Kategori: ${category.name}`,
            description:
                category.description ??
                `Artikel dalam kategori ${category.name}.`,
            images: ["/og-default.jpg"],
        },
    }
}

/* =========================
   ✅ PAGE SSR
========================= */
export default async function CategoryPage(
    {
        params,
    }: {
        params: Promise<{ slug: string }>
    }
) {

    const { slug } = await params
    const supabase = await createClient()

    /* 1️⃣ Ambil kategori */
    const { data: category, error } = await supabase
        .from("categories")
        .select("id, name, slug, description")
        .eq("slug", slug)
        .single()

    if (error || !category) {
        notFound()
    }

    /* 2️⃣ Ambil artikel */
    const { data: articles } = await supabase
        .from("articles")
        .select(
            "id, slug, title, excerpt, thumbnail_url, published_at"
        )
        .eq("category_id", category.id)
        .eq("status", "published")
        .order("published_at", { ascending: false })

    return (
        <div className="container mx-auto px-4 py-12">

            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary">
                    Beranda
                </Link>
                <span className="mx-1">/</span>
                <Link href="/category" className="hover:text-primary">
                    Kategori
                </Link>
                <span className="mx-1">/</span>
                <span className="text-foreground">
                    {category.name}
                </span>
            </nav>

            {/* Title */}
            <h1 className="font-heading text-4xl font-bold mb-4">
                {category.name}
            </h1>

            {/* Description */}
            {category.description && (
                <p className="text-muted-foreground mb-8 max-w-2xl">
                    {category.description}
                </p>
            )}

            {/* Articles */}
            {articles && articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article: Article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Belum ada artikel dalam kategori ini.
                </p>
            )}
        </div>
    )
}`  `