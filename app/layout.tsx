import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Menyimpan metadata website seperti judul dan deskripsi yang akan digunakan untuk SEO dan social sharing.
export const metadata = {
  title: "Sarrahman Bangunan",
  description: "Admin for sarrahman bangunan",
};

// Mendefinisikan fungsi RootLayout yang akan digunakan sebagai layout utama aplikasi.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Bagian utama dari layout, berisi children yang merupakan konten utama dari aplikasi, dan className inter.className yang digunakan untuk menambahkan font Inter ke dalam aplikasi. */}
      <body id="root" className={inter.className}>{children}</body>
    </html>
  );
}
