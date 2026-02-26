import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruangpublik.fun"

export const metadata: Metadata = {
    title: "Tentang Kami - Ruang Publik | Media Opini & Analisis Indonesia",
    description:
        "Ruang Publik adalah media opini dan analisis yang membahas isu sosial, ekonomi, politik, religi, dan teknologi secara reflektif dan berbasis konteks.",
    alternates: {
        canonical: `${baseUrl}/tentang`,
    },
    openGraph: {
        type: "website",
        url: `${baseUrl}/tentang`,
        title: "Tentang Kami - Ruang Publik",
        description:
            "Media opini independen yang mendorong diskursus publik yang sehat dan berbasis data.",
        images: [
            {
                url: `${baseUrl}/logo.png`,
                width: 1200,
                height: 630,
                alt: "Ruang Publik",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tentang Kami - Ruang Publik",
        description:
            "Media opini dan analisis isu publik Indonesia.",
        images: [`${baseUrl}/logo.png`],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function TentangPage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ruang Publik",
        url: `${baseUrl}`,
        logo: `${baseUrl}/logo.png`,
        description:
            "Ruang Publik adalah media opini dan analisis isu sosial, ekonomi, politik, religi, dan teknologi di Indonesia.",
        sameAs: [],

        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "ruangpublik30@gmail.com",
        },
    }

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />

            <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-lg prose-neutral">

                <h1 className="text-4xl font-extrabold mb-8">
                    Tentang Ruang Publik
                </h1>

                <h2 className="text-2xl font-bold mt-10 mb-3">
                    Siapa Kami?
                </h2>
                <p>
                    <strong>Ruang Publik</strong> adalah media opini dan analisis yang membahas isu sosial, ekonomi, politik, religi, dan teknologi dalam perspektif reflektif dan argumentatif.
                    Kami hadir sebagai ruang diskusi publik yang mendorong pemikiran kritis, rasional, dan berbasis konteks.
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-3">
                    Visi
                </h2>
                <p>
                    Menjadi media opini independen yang mendorong diskursus publik yang sehat, kritis, dan berbasis data di Indonesia.
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-3">
                    Misi
                </h2>
                <ul>
                    <li>Menyajikan analisis isu publik secara mendalam dan bertanggung jawab</li>
                    <li>Mengangkat perspektif yang relevan bagi masyarakat luas</li>
                    <li>Mendorong budaya berpikir kritis dan reflektif</li>
                    <li>Menyediakan konteks komprehensif dalam memahami kebijakan dan perkembangan teknologi</li>
                </ul>

                <h2 className="text-2xl font-bold mt-10 mb-3">
                    Fokus Pembahasan
                </h2>
                <ul>
                    <li>Kebijakan publik dan politik nasional</li>
                    <li>Ekonomi dan dinamika kelas menengah</li>
                    <li>Sosial dan budaya masyarakat</li>
                    <li>Religi dan etika dalam ruang publik</li>
                    <li>Teknologi dan transformasi digital</li>
                </ul>

                <h2 className="text-2xl font-bold mt-10 mb-3">
                    Prinsip Editorial
                </h2>
                <p>
                    Dalam setiap publikasi, Ruang Publik berpegang pada independensi, integritas editorial,
                    argumentasi berbasis data, serta tanggung jawab sosial.
                    Kami tidak menerbitkan konten hoaks, ujaran kebencian, atau provokasi tanpa dasar yang jelas.
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-3">
                    Kontak
                </h2>
                <p>
                    Untuk pertanyaan, kerja sama, atau klarifikasi:
                    <br />
                    Email: <a href="mailto:ruangpublik30@gmail.com">ruangpublik30@gmail.com</a>
                </p>

            </article>
        </>
    )
}