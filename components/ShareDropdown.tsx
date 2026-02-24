"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Twitter, Facebook, Linkedin, Link } from "lucide-react"

type Props = {
    title: string
    url: string
}

export default function ShareDropdown({ title, url }: Props) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close ketika klik di luar
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const copyLink = async () => {
        await navigator.clipboard.writeText(url)
        alert("Link berhasil disalin!")
        setOpen(false)
    }

    return (
        <div className="relative inline-block" ref={ref}>
            {/* BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-muted"
            >
                <Share2 size={16} />
                Share
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <p className="text-sm font-medium mb-3">Share this article</p>

                    <div className="space-y-2">
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                            target="_blank"
                            className="flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-muted"
                        >
                            <Twitter size={16} />
                            Twitter
                        </a>

                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                            target="_blank"
                            className="flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-muted"
                        >
                            <Facebook size={16} />
                            Facebook
                        </a>

                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                            target="_blank"
                            className="flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-muted"
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>

                        <button
                            onClick={copyLink}
                            className="w-full flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-muted"
                        >
                            <Link size={16} />
                            Copy Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}