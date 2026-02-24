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
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()

    const { data: category } = await supabase
        .from("categories")
        .select("name, description, slug")
        .eq("slug", slug)
        .single()

    if (!category) return {}

    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/category/${slug}`

    return {
        title: `Kategori: ${category.name} | Ruang Publik`,
        description:
            category.description ??
            `Artikel dalam kategori ${category.name}.`,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title: `Kategori: ${category.name}`,
            description:
                category.description ??
                `Artikel dalam kategori ${category.name}.`,
            url,
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: `Kategori: ${category.name}`,
            description:
                category.description ??
                `Artikel dalam kategori ${category.name}.`,
        },
    }
}

/* =========================
   ✅ PAGE SSR
========================= */
export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const supabase = await createClient()

    /* 1️⃣ Ambil kategori */
    const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("id, name, slug, description")
        .eq("slug", slug)
        .single()

    if (categoryError || !category) {
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
                <Link href="/categories" className="hover:text-primary">
                    Kategori
                </Link>
                <span className="mx-1">/</span>
                <span className="text-foreground">
                    {category.name}
                </span>
            </nav>

            {/* Title */}
            <h1 className="font-heading text-4xl font-bold mb-8">
                {category.name}
            </h1>

            {/* Articles */}
            {articles && articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article: Article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Belum ada artikel dalam kategori ini.
                </p>
            )}
        </div>
    )
}