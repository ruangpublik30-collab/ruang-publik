

import Image from "next/image"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import type { Metadata } from "next"
import crypto from "crypto"

import { createClient } from "@/lib/supabase/server"
import CommentItem from "@/components/CommentItem"
import ShareDropdown from "@/components/ShareDropdown"
import TrackView from "@/components/TrackView"
import { Eye } from "lucide-react"
import Link from "next/link"

/* =========================
   TYPES
========================= */

type Params = { slug: string }

type Comment = {
    id: string
    parent_id: string | null
    name: string
    content: string
    created_at: string
    replies?: Comment[]
}

/* =========================
   HELPERS
========================= */

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, "")
}

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || "https://ruangpublik.fun"
}

function buildCommentTree(comments: Comment[]): Comment[] {
    const map = new Map<string, Comment>()
    const roots: Comment[] = []

    comments.forEach((c) => map.set(c.id, { ...c, replies: [] }))
    comments.forEach((c) => {
        if (c.parent_id) {
            map.get(c.parent_id)?.replies?.push(map.get(c.id)!)
        } else {
            roots.push(map.get(c.id)!)
        }
    })

    return roots
}

/* =========================
   METADATA (DYNAMIC)
========================= */

export const dynamic = "force-dynamic"

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

    const { slug } = await params
    const supabase = await createClient()
    const { data } = await supabase
        .from("articles")
        .select("title, content, thumbnail_url, slug, published_at")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruangpublik.fun"
    const url = `${baseUrl}/artikel/${slug}`

    if (!data) {
        return {
            title: "Artikel tidak ditemukan",
            description: "Artikel tidak tersedia.",
            robots: { index: false, follow: false },
        }
    }

    const description = data.content
        ? data.content.replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160)
        : ""

    const imageUrl = data.thumbnail_url?.startsWith("http")
        ? data.thumbnail_url
        : data.thumbnail_url
            ? `${baseUrl}${data.thumbnail_url}`
            : `${baseUrl}/default-og-image.jpg`

    return {
        title: data.title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: "article",
            url,
            title: data.title,
            description,
            publishedTime: data.published_at ?? undefined,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description,
            images: [imageUrl],
        },
        robots: {
            index: true,
            follow: true,
        },
    }
}
/* =========================
   PAGE COMPONENT
========================= */

export default async function ArticlePage(
    { params }: { params: Promise<Params> }
) {
    const { slug } = await params
    const supabase = await createClient()

    // Ambil artikel
    const { data: article, error } = await supabase
        .from("articles")
        .select("id, slug, title, content, thumbnail_url, published_at, views, category_id")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

    if (error || !article) notFound()

    // Hitung IP hash untuk tracking view
    const headerList = await headers()
    const forwarded = headerList.get("x-forwarded-for")
    const realIp = headerList.get("x-real-ip")
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "unknown"
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex")

    // Ambil komentar
    const { data: allComments } = await supabase
        .from("comments")
        .select("id, parent_id, name, content, created_at")
        .eq("article_id", article.id)
        .order("created_at", { ascending: true })

    const commentTree = buildCommentTree(allComments || [])

    const baseUrl = getBaseUrl()
    const shareUrl = `${baseUrl}/artikel/${article.slug}`
    // Ambil artikel terkait (kategori sama)
    const { data: relatedArticles } = await supabase
        .from("articles")
        .select("id, slug, title, thumbnail_url, published_at")
        .eq("status", "published")
        .eq("category_id", article.category_id)
        .neq("id", article.id)
        .order("published_at", { ascending: false })
        .limit(3)

    return (
        <>
            <TrackView articleId={article.id} ipHash={ipHash} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: article.title,
                        description: stripHtml(article.content).slice(0, 160),
                        image: article.thumbnail_url
                            ? article.thumbnail_url.startsWith("http")
                                ? article.thumbnail_url
                                : `${baseUrl}${article.thumbnail_url}`
                            : `${baseUrl}/default-og-image.jpg`,
                        datePublished: article.published_at,
                        dateModified: article.published_at,
                        wordCount: stripHtml(article.content).split(/\s+/).length,
                        author: {
                            "@type": "Organization",
                            name: "Ruang Publik",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Ruang Publik",
                            logo: {
                                "@type": "ImageObject",
                                url: `${baseUrl}/logo.png`,
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": shareUrl,
                        },
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Beranda",
                                item: baseUrl,
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: article.title,
                                item: shareUrl,
                            },
                        ],
                    }),
                }}
            />
            <article className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">{article.title}</h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {article.published_at && (
                        <span>
                            {new Date(article.published_at).toLocaleDateString("id-ID")}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {article.views} views
                    </span>
                </div>

                {article.thumbnail_url && (
                    <div className="my-6">
                        <Image
                            src={article.thumbnail_url}
                            alt={article.title}
                            width={1200}
                            height={630}
                            className="rounded-lg w-full h-auto"
                            priority
                        />
                    </div>
                )}

                <div
                    className="prose-article"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="mt-8 pt-6 border-t">
                    <p className="text-sm font-medium mb-3">Bagikan artikel ini:</p>
                    <div className="flex flex-wrap gap-3">
                        <ShareDropdown title={article.title} url={shareUrl} />
                    </div>
                </div>
            </article>

            <div className="max-w-3xl mx-auto mt-12 border-t pt-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Komentar ({allComments?.length || 0})
                </h2>

                <div className="space-y-6">
                    {commentTree.length > 0 ? (
                        commentTree.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                articleId={article.id}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground">Belum ada komentar.</p>
                    )}
                </div>
            </div>

            {/* Artikel Terkait */}
            <div className="max-w-3xl mx-auto mt-16 border-t pt-12">
                <h2 className="text-2xl font-semibold mb-6">
                    Artikel Terkait
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {relatedArticles && relatedArticles.length > 0 ? (
                        relatedArticles.map((item) => (
                            <Link
                                key={item.id}
                                href={`/artikel/${item.slug}`}
                                
                                className="block border rounded-lg overflow-hidden hover:shadow-md transition"
                                
                            >
                                {item.thumbnail_url && (
                                    <Image
                                        src={item.thumbnail_url}
                                        alt={item.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-40 object-cover"
                                    />
                                )}

                                <div className="p-4">
                                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                                        {item.title}
                                    </h3>

                                    {item.published_at && (
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(item.published_at).toLocaleDateString("id-ID")}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-muted-foreground">
                            Belum ada artikel terkait.
                        </p>
                    )}
                </div>
            </div>

        </>
        
    )
}