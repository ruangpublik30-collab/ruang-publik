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
    status: string
}

export default async function TagDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const supabase = await createClient()

    // 1️⃣ Ambil tag berdasarkan slug
    const { data: tag, error: tagError } = await supabase
        .from("tags")
        .select("id, name, slug")
        .eq("slug", slug.toLowerCase())
        .single()

    if (tagError || !tag) {
        notFound()
    }

    // 2️⃣ Ambil artikel berdasarkan tag
    const { data: articles, error: articleError } = await supabase
        .from("article_tags")
        .select(`
            articles (
                id,
                slug,
                title,
                excerpt,
                thumbnail_url,
                published_at,
                status
            )
        `)
        .eq("tag_id", tag.id)

    if (articleError) {
        console.error(articleError)
    }

    const publishedArticles =
        articles
            ?.map((item: any) => item.articles)
            .filter((article: any) => article?.status === "published") || []

    return (
        <div className="container mx-auto px-4 py-12">
            <nav className="text-sm text-muted-foreground mb-6">
                <Link href="/">Beranda</Link>
                <span className="mx-1">/</span>
                <Link href="/tag">Tag</Link>
                <span className="mx-1">/</span>
                <span className="text-foreground">
                    {tag.name}
                </span>
            </nav>

            <h1 className="text-4xl font-bold mb-8">
                #{tag.name}
            </h1>

            {publishedArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publishedArticles.map((article: Article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Belum ada artikel dengan tag ini.
                </p>
            )}
        </div>
    )
}