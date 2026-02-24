"use client"

import { useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase/client"

type Props = {
    articleId: string
    ipHash: string
}

export default function TrackView({ articleId, ipHash }: Props) {
    const hasIncremented = useRef(false)

    useEffect(() => {
        if (!articleId || !ipHash) return
        if (hasIncremented.current) return

        hasIncremented.current = true

        const incrementView = async () => {
            const { error } = await supabase.rpc(
                "increment_article_view_unique",
                {
                    p_article_id: articleId,
                    p_ip_hash: ipHash,
                }
            )

            if (error) {
                console.error("View increment failed:", error)
            }
        }

        incrementView()
    }, [articleId, ipHash])

    return null
}