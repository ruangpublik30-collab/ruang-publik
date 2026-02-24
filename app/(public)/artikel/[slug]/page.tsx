export const dynamic = "force-dynamic"

import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CommentItem from "@/components/CommentItem"
import ShareDropdown from "@/components/ShareDropdown"
import TrackView from "@/components/TrackView"
import { Eye } from "lucide-react"
import { headers } from "next/headers"
import crypto from "crypto"
import type { Metadata } from "next"

/* ================= TYPES ================= */

type Props = {
    params: Promise<{ slug: string }>
}

type Comment = {
    id: string
    parent_id: string | null
    name: string
    content: string
    created_at: string
    replies?: Comment[]
}

/* ================= HELPERS ================= */

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, "")
}

async function getBaseUrl() {
    const headerList = await headers()

    const host =
        headerList.get("x-forwarded-host") ||
        headerList.get("host") ||
        "localhost:3000"

    const protocol =
        process.env.NODE_ENV === "production" ? "https" : "http"

    return `${protocol}://${host}`
}

function buildCommentTree(comments: Comment[]): Comment[] {
    const map = new Map<string, Comment>()
    const roots: Comment[] = []

    comments.forEach((c) => {
        map.set(c.id, { ...c, replies: [] })
    })

    comments.forEach((c) => {
        if (c.parent_id) {
            map.get(c.parent_id)?.replies?.push(map.get(c.id)!)
        } else {
            roots.push(map.get(c.id)!)
        }
    })

    return roots
}

/* ================= METADATA ================= */

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const { slug } = await params
    const supabase = await createClient()

    const { data } = await supabase
        .from("articles")
        .select("title, content, thumbnail_url, slug, published_at")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

    if (!data) {
        return {
            title: "Artikel tidak ditemukan",
            description: "Artikel tidak tersedia.",
        }
    }

    const baseUrl = await getBaseUrl()
    const url = `${baseUrl}/artikel/${data.slug}`

    const description =
        stripHtml(data.content || "").slice(0, 160)

    const imageUrl = data.thumbnail_url?.startsWith("http")
        ? data.thumbnail_url
        : `${baseUrl}${data.thumbnail_url}`

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
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                    },
                ]
                : [],
            publishedTime: data.published_at || undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
    }
}

/* ================= PAGE ================= */

export default async function ArticlePage(
    { params }: Props
) {

    const { slug } = await params
    const supabase = await createClient()

    const { data: article, error } = await supabase
        .from("articles")
        .select("id, slug, title, content, thumbnail_url, published_at, views")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

    if (error || !article) {
        notFound()
    }

    /* ================= IP HASH ================= */

    const headerList = await headers()

    const forwarded = headerList.get("x-forwarded-for")
    const realIp = headerList.get("x-real-ip")

    const ip = forwarded
        ? forwarded.split(",")[0].trim()
        : realIp || "unknown"

    const ipHash = crypto
        .createHash("sha256")
        .update(ip)
        .digest("hex")

    /* ================= COMMENTS ================= */

    const { data: allComments } = await supabase
        .from("comments")
        .select("id, parent_id, name, content, created_at")
        .eq("article_id", article.id)
        .order("created_at", { ascending: true })

    const commentTree = buildCommentTree(allComments || [])

    const baseUrl = await getBaseUrl()
    const shareUrl = `${baseUrl}/artikel/${article.slug}`

    /* ================= RENDER ================= */

    return (
        <>
            <TrackView articleId={article.id} ipHash={ipHash} />

            <article className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">
                    {article.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {article.published_at && (
                        <span>
                            {new Date(article.published_at)
                                .toLocaleDateString("id-ID")}
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
                    dangerouslySetInnerHTML={{
                        __html: article.content,
                    }}
                />
            </article>

            <div className="max-w-3xl mx-auto mt-6 flex justify-end">
                <ShareDropdown
                    title={article.title}
                    url={shareUrl}
                />
            </div>

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
                        <p className="text-muted-foreground">
                            Belum ada komentar.
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}