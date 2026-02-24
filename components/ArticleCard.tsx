import Link from "next/link"
import Image from "next/image"

type Article = {
    id: string
    slug: string
    title: string
    excerpt?: string | null
    thumbnail_url?: string | null
    published_at?: string | null
}

interface ArticleCardProps {
    article: Article
    featured?: boolean
}

export default function ArticleCard({
    article,
    featured = false,
}: ArticleCardProps) {
    return (
        <article className="group">
            <Link href={`/artikel/${article.slug}`}>
                <div
                    className={
                        featured
                            ? "grid md:grid-cols-2 gap-8 items-center"
                            : "space-y-3"
                    }
                >
                    {/* Thumbnail */}
                    {article.thumbnail_url && (
                        <div
                            className={
                                featured
                                    ? "relative aspect-[16/10] rounded-xl overflow-hidden"
                                    : "relative aspect-[16/10] rounded-lg overflow-hidden"
                            }
                        >
                            <Image
                                src={article.thumbnail_url}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className={featured ? "space-y-4" : ""}>
                        <h2
                            className={
                                featured
                                    ? "text-3xl font-bold group-hover:text-primary transition-colors"
                                    : "text-xl font-semibold group-hover:text-primary transition-colors"
                            }
                        >
                            {article.title}
                        </h2>

                        {article.published_at && (
                            <p className="text-sm text-muted-foreground">
                                {new Date(article.published_at).toLocaleDateString("id-ID")}
                            </p>
                        )}

                        {article.excerpt && (
                            <p
                                className={
                                    featured
                                        ? "text-base text-muted-foreground line-clamp-3"
                                        : "text-sm text-muted-foreground line-clamp-3"
                                }
                            >
                                {article.excerpt}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )
}