"use client";
import { Navlink } from "@/src/components/atoms";

/**
 * Komponen NavGroup digunakan untuk membuat kelompok tautan navigasi dalam aplikasi.
 *
 * @param {Array} pages - Array berisi objek yang berisi label dan href dari setiap tautan.
 * @param {string} direction - Arah tata letak tautan dalam kelompok ("horizontal" atau "vertical").
 */

interface NavGroupProps {
  pages: {
    label: string;
    href: string;
  }[];
  direction: "horizontal" | "vertical";
}

const NavGroup = ({ pages, direction }: NavGroupProps) => {
  // Mendefinisikan kelas CSS berdasarkan arah tata letak tautan
  const classDirection = {
    horizontal: "flex-row items-center md:space-x-10",
    vertical: "flex-col space-y-4",
  };

  // Membentuk kelas CSS sesuai dengan arah yang diberikan
  const className = `flex transition
  ${classDirection[direction || "horizontal"]}
  `;

  return (
    <nav className={className}>
      {pages.map((item, i) => (
        <div key={i}>
          {/* Menggunakan komponen Navlink untuk menampilkan tautan */}
          <Navlink href={item.href}>{item.label}</Navlink>
        </div>
      ))}
    </nav>
  );
};

export default NavGroup;
