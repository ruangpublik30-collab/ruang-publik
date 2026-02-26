import type { MetadataRoute } from "next"
import { createClient } from "../lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()

    const { data } = await supabase
        .from("articles")
        .select("slug, published_at")
        .eq("status", "published")

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://ruangpublik.fun"

    const articles =
        data?.map((article) => ({
            url: `${baseUrl}/artikel/${article.slug}`,
            lastModified: article.published_at
                ? new Date(article.published_at)
                : new Date(),
        })) ?? []

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...articles,
    ]
}