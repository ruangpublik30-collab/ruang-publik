"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu } from "lucide-react"
import { useState } from "react"
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
        <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => onMenuChange?.(null)}
                        className="font-heading text-2xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                        Artikel
                    </Link>

                    {/* Desktop Nav */}
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

                    <div className="flex items-center gap-3">

                        {/* Search */}
                        {searchOpen ? (
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari artikel..."
                                    className="bg-secondary text-foreground text-sm px-3 py-1.5 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring w-48"
                                    autoFocus
                                />
                            </form>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label="Cari"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        )}

                        {/* Mobile Menu */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button
                                    className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2"
                                    aria-label="Menu"
                                >
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
                                        className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                                    >
                                        Beranda
                                    </button>

                                    <button
                                        onClick={() => {
                                            onMenuChange?.("kategori")
                                            setMobileMenuOpen(false)
                                        }}
                                        className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                                    >
                                        Kategori
                                    </button>

                                    <button
                                        onClick={() => {
                                            onMenuChange?.("tag")
                                            setMobileMenuOpen(false)
                                        }}
                                        className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
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
    )
}