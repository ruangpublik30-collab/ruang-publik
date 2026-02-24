"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitComment(formData: FormData) {
    const supabase = await createClient()

    const articleId = formData.get("article_id") as string
    const parentId = formData.get("parent_id") as string | null
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const content = formData.get("content") as string

    if (!name || !email || !content) {
        throw new Error("Semua field wajib diisi")
    }

    const { error } = await supabase.from("comments").insert([
        {
            article_id: articleId,
            parent_id: parentId || null,
            name,
            email,
            content,
        },
    ])

    if (error) throw new Error("Gagal menyimpan komentar")
}