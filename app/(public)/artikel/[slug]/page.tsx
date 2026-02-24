import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { submitComment } from "@/app/actions/comment"
import CommentItem from "@/components/CommentItem"
import ShareDropdown from "@/components/ShareDropdown"
import TrackView from "@/components/TrackView"
import { Eye } from "lucide-react"
import { headers } from "next/headers"
import crypto from "crypto"

type Comment = {
    id: string
    parent_id: string | null
    name: string
    content: string
    created_at: string
    replies?: Comment[]
}

export default async function ArticlePage(
    { params }: { params: { slug: string } }
) {
    const { slug } = await Promise.resolve(params)

    const supabase = await createClient()

    /* ================= ARTIKEL ================= */
    const { data: article, error } = await supabase
        .from("articles")
        .select("id, slug, title, content, thumbnail_url, published_at, views")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

    if (error || !article) notFound()

    /* ================= IP HASH (SERVER SIDE) ================= */
    const headersList = await headers() // ✅ WAJIB await di Next terbaru

    const forwarded = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")

    const ip = forwarded
        ? forwarded.split(",")[0].trim()
        : realIp || "unknown"

    const ipHash = crypto
        .createHash("sha256")
        .update(ip)
        .digest("hex")

    /* ================= KOMENTAR ================= */
    const { data: allComments } = await supabase
        .from("comments")
        .select("id, parent_id, name, content, created_at")
        .eq("article_id", article.id)
        .order("created_at", { ascending: true })

    function buildTree(comments: Comment[]): Comment[] {
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

    const commentTree = buildTree(allComments || [])

    return (
        <>
            {/* ================= VIEW TRACKING ================= */}
            <TrackView
                articleId={article.id}
                ipHash={ipHash}
            />

            {/* ================= ARTIKEL ================= */}
            <article className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">
                    {article.title}
                </h1>

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
            </article>

            {/* ================= SHARE ================= */}
            <div className="max-w-3xl mx-auto mt-6 flex justify-end">
                <ShareDropdown
                    title={article.title}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}/artikel/${article.slug}`}
                />
            </div>

            {/* ================= KOMENTAR ================= */}
            <div className="max-w-3xl mx-auto mt-12 border-t pt-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Komentar ({allComments?.length || 0})
                </h2>

                <div className="bg-muted p-6 rounded-lg mb-8">
                    <form action={submitComment} className="space-y-4">
                        <input type="hidden" name="article_id" value={article.id} />

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="name"
                                required
                                placeholder="Nama"
                                className="border px-3 py-2 rounded-md w-full"
                            />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="border px-3 py-2 rounded-md w-full"
                            />
                        </div>

                        <textarea
                            name="content"
                            required
                            placeholder="Tulis komentar..."
                            className="border px-3 py-2 rounded-md w-full min-h-[120px]"
                        />

                        <button className="bg-black text-white px-5 py-2 rounded-md">
                            Kirim Komentar
                        </button>
                    </form>
                </div>

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