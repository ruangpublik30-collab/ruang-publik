import { createClient } from "@/lib/supabase/server"
import ArticleCard from "@/components/ArticleCard"

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const { q } = await searchParams
    const query = q?.trim() || ""

    const supabase = await createClient()
    let articles: any[] = []

    if (query) {
        try {
            // Cari di title dan content
            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
                .order("published_at", { ascending: false })

            if (error) console.error("Text search error:", error)

            articles = data || []
        } catch (err) {
            console.error("SEARCH ERROR:", err)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Hasil Pencarian</h1>

            {query && (
                <p className="mb-6 text-muted-foreground">
                    Kata kunci: <strong>{query}</strong>
                </p>
            )}

            {articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Tidak ada artikel ditemukan.
                </p>
            )}
        </div>
    )
}