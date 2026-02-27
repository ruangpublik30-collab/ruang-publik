import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Ruang Publik",
  description: "Halaman Disclaimer resmi Ruang Publik. Informasi mengenai batasan tanggung jawab, opini, risiko keuangan, dan penggunaan situs.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ruangpublik.fun/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      <p className="mb-8 text-sm text-gray-500">
        Terakhir diperbarui: 28 Februari 2026
      </p>

      <section className="space-y-6 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Informasi Umum</h2>
          <p>
            Seluruh informasi yang dipublikasikan di Ruang Publik disediakan untuk tujuan
            informasi dan edukasi umum. Kami berupaya menyajikan konten yang akurat dan relevan,
            namun tidak memberikan jaminan atas kelengkapan maupun ketepatan informasi.
          </p>
          <p className="mt-2">
            Segala tindakan yang Anda ambil berdasarkan informasi dari situs ini sepenuhnya
            menjadi tanggung jawab Anda sendiri.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Konten Opini dan Analisis</h2>
          <p>
            Artikel di Ruang Publik bersifat opini dan analisis sosial, ekonomi, serta refleksi
            publik. Pandangan yang disampaikan merupakan hasil pemikiran penulis dan tidak selalu
            mencerminkan fakta absolut atau posisi institusi tertentu.
          </p>
          <p className="mt-2">
            Konten tidak dimaksudkan sebagai nasihat profesional dalam bidang hukum,
            keuangan, investasi, kesehatan, maupun bidang lainnya.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Risiko Keuangan dan Investasi</h2>
          <p>
            Jika terdapat pembahasan mengenai pasar keuangan, investasi, atau instrumen
            perdagangan, informasi tersebut bersifat edukatif dan bukan merupakan
            rekomendasi investasi.
          </p>
          <p className="mt-2">
            Perdagangan dan investasi memiliki risiko kerugian. Pembaca disarankan
            melakukan riset mandiri atau berkonsultasi dengan penasihat profesional
            sebelum mengambil keputusan finansial.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Tautan Eksternal</h2>
          <p>
            Situs ini dapat berisi tautan ke situs eksternal yang tidak berada di bawah
            kendali Ruang Publik. Kami tidak bertanggung jawab atas isi atau kebijakan
            situs pihak ketiga tersebut.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Hak Cipta</h2>
          <p>
            Seluruh konten di Ruang Publik dilindungi oleh hak cipta kecuali dinyatakan
            lain. Dilarang menyalin atau mempublikasikan ulang tanpa izin tertulis.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Perubahan Disclaimer</h2>
          <p>
            Kami berhak memperbarui halaman ini sewaktu-waktu. Perubahan berlaku
            segera setelah dipublikasikan.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Persetujuan</h2>
          <p>
            Dengan mengakses situs ini, Anda dianggap telah membaca dan menyetujui
            Disclaimer ini.
          </p>
        </div>
      </section>
    </main>
  );
}
