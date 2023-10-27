import { Typography } from "../../atoms";

/**
 * Komponen `FooterText` digunakan untuk menampilkan teks hak cipta dan kredit pembuat situs web di bagian bawah halaman.
 */

const FooterText = () => {
  // Mendapatkan tahun saat ini

  const thisYear = new Date().getFullYear();

  return (
    <div className="py-6">
      <Typography align="center" variant="helper" color="secondary">
        Hak Cipta © {thisYear.toString()}. Dibuat dengan ♥ oleh Sarrahman
      </Typography>
    </div>
  );
};

export default FooterText;
