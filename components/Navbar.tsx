"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image";


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
        <>
            {/* FIXED NAVBAR */}
            <header className="fixed inset-x-0 top-0 z-50 h-16 bg-background border-b">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                    <div className="flex items-center">

                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/logo.png"
                                    alt="NDX"
                                    width={300}
                                    height={200}
                                    className="h-24 w-auto"
                                    priority
                                />
                            </Link>

                        </div>
                    

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-base font-semibold tracking-wide text-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                        <Link href="/category" className="hover:text-primary transition-colors">Kategori</Link>
                        <Link href="/tag" className="hover:text-primary transition-colors">Tag</Link>
                        <Link href="/tentang" className="hover:text-primary transition-colors">Tentang</Link>
                        <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
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
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="md:hidden"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu Icon */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Mobile Search Dropdown */}
                        {searchOpen && (
                            <div className="md:hidden fixed top-16 left-0 w-full bg-background border-t px-6 py-4 z-[100] shadow-md">
                                <form onSubmit={handleSearch} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Cari artikel..."
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        className="flex-1 border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="text-sm px-4 py-2 bg-primary text-white rounded-md"
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

            
                       

                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden border-t px-6 py-5 flex flex-col gap-5 text-base font-medium bg-background">

                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className="hover:text-primary transition-colors"
                        >
                            Beranda
                        </Link>

                        <Link
                            href="/category"
                            onClick={() => setMobileOpen(false)}
                            className="hover:text-primary transition-colors"
                        >
                            Kategori
                        </Link>

                        <Link
                            href="/tag"
                            onClick={() => setMobileOpen(false)}
                            className="hover:text-primary transition-colors"
                        >
                            Tag
                        </Link>

                        <Link
                            href="/tentang"
                            onClick={() => setMobileOpen(false)}
                            className="hover:text-primary transition-colors"
                        >
                            Tentang
                        </Link>

                        <Link
                            href="/disclaimer"
                            onClick={() => setMobileOpen(false)}
                            className="hover:text-primary transition-colors"
                        >
                            Dsclaimer
                        </Link>

                    </div>
                )}
                
            </header>

            {/* Spacer supaya konten tidak ketutup */}
            <div className="h-16" />
        </>
    )
}