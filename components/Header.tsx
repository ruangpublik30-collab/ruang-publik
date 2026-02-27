"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type HeaderProps = {
    onMenuChange?: (menu: "kategori" | "tag" | null) => void
}

export default function Header({ onMenuChange }: HeaderProps) {
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
            setSearchOpen(false)
            setQuery("")
        }
    }

    return (
        <>
            {/* HEADER */}
            <header className="fixed inset-x-0 top-0 z-50 h-16 bg-background/95 backdrop-blur border-b">
                <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-full">

                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={() => onMenuChange?.(null)}
                            className="text-xl sm:text-2xl font-bold tracking-tight hover:text-primary transition-colors"
                        >
                            Ruang Publik
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <button
                                onClick={() => onMenuChange?.(null)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Beranda
                            </button>

                            <button
                                onClick={() => onMenuChange?.("kategori")}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Kategori
                            </button>

                            <button
                                onClick={() => onMenuChange?.("tag")}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Tag
                            </button>
                        </nav>

                        {/* Right Side */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Search */}
                            {searchOpen ? (
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Cari artikel..."
                                        className="w-40 sm:w-56 bg-secondary text-sm px-3 py-1.5 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                        autoFocus
                                    />
                                </form>
                            ) : (
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            )}

                            {/* Mobile Menu */}
                            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
                                        <Menu className="w-5 h-5" />
                                    </button>
                                </SheetTrigger>

                                <SheetContent side="right" className="w-64">
                                    <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                    </SheetHeader>

                                    <nav className="flex flex-col gap-4 mt-6">
                                        <button
                                            onClick={() => {
                                                onMenuChange?.(null)
                                                setMobileMenuOpen(false)
                                            }}
                                            className="text-left"
                                        >
                                            Beranda
                                        </button>

                                        <button
                                            onClick={() => {
                                                onMenuChange?.("kategori")
                                                setMobileMenuOpen(false)
                                            }}
                                            className="text-left"
                                        >
                                            Kategori
                                        </button>

                                        <button
                                            onClick={() => {
                                                onMenuChange?.("tag")
                                                setMobileMenuOpen(false)
                                            }}
                                            className="text-left"
                                        >
                                            Tag
                                        </button>
                                    </nav>
                                </SheetContent>
                            </Sheet>

                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer supaya konten tidak ketutup header */}
            <div className="h-1000" />
        </>
    )
}