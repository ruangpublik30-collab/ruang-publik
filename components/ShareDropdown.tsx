"use client"

import { Twitter, Facebook, Linkedin, Link } from "lucide-react"

type Props = {
    title: string
    url: string
}

export default function ShareDropdown({ title, url }: Props) {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const copyLink = async () => {
        await navigator.clipboard.writeText(url)
        alert("Link berhasil disalin!")
    }

    return (
        <div className="flex flex-wrap gap-3">
            <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-muted transition"
            >
                <Twitter size={16} />
                Twitter
            </a>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-muted transition"
            >
                <Facebook size={16} />
                Facebook
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-muted transition"
            >
                <Linkedin size={16} />
                LinkedIn
            </a>

            <button
                onClick={copyLink}
                className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-muted transition"
            >
                <Link size={16} />
                Copy Link
            </button>
        </div>
    )
}