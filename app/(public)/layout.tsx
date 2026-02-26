export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative">

            {/* Spacer sesuai tinggi header */}
            <div className="h-16" />

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
                <main>
                    {children}
                </main>
            </div>

        </div>
    )
}