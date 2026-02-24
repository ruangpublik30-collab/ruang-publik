"use client"

import { useState } from "react"
import { submitComment } from "@/app/actions/comment"

type Comment = {
    id: string
    name: string
    content: string
    created_at: string
    replies?: Comment[]
}

type Props = {
    comment: Comment
    articleId: string
}

export default function CommentItem({ comment, articleId }: Props) {
    const [showReply, setShowReply] = useState(false)

    return (
        <div className="border rounded-lg p-4">
            {/* HEADER */}
            <div className="flex justify-between mb-2">
                <p className="font-semibold">{comment.name}</p>
                <p className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString("id-ID")}
                </p>
            </div>

            {/* CONTENT */}
            <p className="mb-3 text-sm">{comment.content}</p>

            {/* BUTTON BALAS */}
            <button
                type="button"
                onClick={() => setShowReply((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline"
            >
                Balas
            </button>

            {/* FORM BALAS (MUNCUL SAAT DIKLIK) */}
            {showReply && (
                <form
                    action={submitComment}
                    className="mt-4 space-y-3 bg-muted p-4 rounded-md"
                >
                    <input type="hidden" name="article_id" value={articleId} />
                    <input type="hidden" name="parent_id" value={comment.id} />

                    <input
                        name="name"
                        required
                        placeholder="Nama"
                        className="border px-2 py-1 rounded-md w-full text-sm"
                    />

                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        className="border px-2 py-1 rounded-md w-full text-sm"
                    />

                    <textarea
                        name="content"
                        required
                        placeholder="Tulis balasan..."
                        className="border px-2 py-1 rounded-md w-full text-sm"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-1 rounded-md text-sm"
                    >
                        Kirim
                    </button>
                </form>
            )}

            {/* REPLIES (RECURSIVE) */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 border-l pl-4 mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            articleId={articleId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}