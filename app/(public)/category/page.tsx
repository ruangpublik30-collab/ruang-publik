import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

type CategoryWithCount = {
    id: string
    name: string
    slug: string
    description: string | null
    articles: { count: number }[]
}

export default async function CategoryIndexPage() {
    const supabase = await createClient()

    const { data: categories } = await supabase
        .from("categories")
        .select(`
      id,
      name,
      slug,
      description,
      articles(count)
    `)
        .eq("articles.status", "published")
        .order("name", { ascending: true })

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Semua Kategori</h1>

            {categories && categories.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category: CategoryWithCount) => {
                        const articleCount =
                            category.articles?.[0]?.count ?? 0

                        return (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="p-6 border rounded-xl hover:shadow-md transition"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {category.name}
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    {articleCount} artikel
                                </p>

                                {category.description && (
                                    <p className="text-sm mt-2">
                                        {category.description}
                                    </p>
                                )}
                            </Link>
                        )
                    })}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    Belum ada kategori tersedia.
                </p>
            )}
        </div>
    )
}