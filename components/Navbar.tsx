"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [keyword, setKeyword] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!keyword.trim()) return
        router.push(`/search?q=${keyword}`)
        setSearchOpen(false)
        setKeyword("")
    }

    return (
        <header className="border-b relative">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-semibold">
                    Artikel
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                    <Link href="/">Beranda</Link>
                    <Link href="/category">Kategori</Link>
                    <Link href="/tag">Tag</Link>
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Desktop Search */}
                    <div className="hidden md:flex items-center">
                        {!searchOpen ? (
                            <button onClick={() => setSearchOpen(true)}>
                                <Search className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                            </button>
                        ) : (
                            <form onSubmit={handleSearch} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="border px-3 py-1 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="text-sm px-3 py-1 bg-primary text-white rounded-md"
                                >
                                    Cari
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSearchOpen(false)}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Mobile Search Icon */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="md:hidden"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* ✅ MOBILE SEARCH OVERLAY (tidak mendorong layout) */}
            {searchOpen && (
                <div className="absolute inset-0 bg-white flex items-center px-6 py-5 md:hidden z-50">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Cari artikel..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md"
                        >
                            Cari
                        </button>
                        <button
                            type="button"
                            onClick={() => setSearchOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4 text-sm">
                    <Link href="/">Beranda</Link>
                    <Link href="/category">Kategori</Link>
                    <Link href="/tag">Tag</Link>
                </div>
            )}
        </header>
    )
}