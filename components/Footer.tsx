"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <footer className="relative mt-24 text-gray-300 bg-gradient-to-b from-black via-zinc-900 to-black">

                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

                    {/* Logo & Deskripsi */}
                    <div>
                        <h2 className="text-white text-2xl font-bold mb-4 tracking-wide">
                            NDX Insight
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Media, market, dan development insight yang membangun
                            perspektif rasional dan strategis.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Navigasi</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-yellow-400 transition duration-300">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/ruang-publik" className="hover:text-yellow-400 transition duration-300">
                                    Ruang Publik
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang" className="hover:text-yellow-400 transition duration-300">
                                    Tentang
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="hover:text-yellow-400 transition duration-300">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kategori */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Kategori</h3>
                        <ul className="space-y-2 text-sm">
                            {["Bisnis", "Digital", "Kesehatan", "Religi"].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-yellow-400 transition duration-300 cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Newsletter
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Dapatkan artikel terbaru langsung ke email Anda.
                        </p>

                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="px-4 py-2 rounded-md bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-md transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                <div className="border-t border-zinc-800 text-center text-sm py-6 text-gray-500">
                    © {new Date().getFullYear()} NDX Insight.
                    <div className="mt-2 flex justify-center gap-6">
                        <Link href="/disclaimer" className="hover:text-yellow-400">
                            Disclaimer
                        </Link>
                        <Link href="/privacy-policy" className="hover:text-yellow-400">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-yellow-400">
                            Terms
                        </Link>
                    </div>
                </div>

            </footer>

            {showTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition duration-300"
                >
                    <ArrowUp size={18} />
                </button>
            )}
        </>
    );
}