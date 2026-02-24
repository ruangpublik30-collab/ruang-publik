import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function TagPage() {
    const supabase = await createClient()

    const { data: tags } = await supabase
        .from("tags")
        .select("id, name, slug")
        .order("name", { ascending: true })

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">
                Semua Tag
            </h1>

            {tags && tags.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {tags.map((tag) => (
                        <Link
                            key={tag.id}
                            href={`/tag/${tag.slug}`}
                            className="px-4 py-2 bg-muted rounded-lg hover:bg-primary hover:text-white transition"
                        >
                            #{tag.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Belum ada tag tersedia.
                </p>
            )}
        </div>
    )
}