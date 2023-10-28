"use client";
import { usePathname, useRouter } from "next/navigation";

/**
 * Komponen ItemTopBar digunakan untuk membuat item pada bilah bawah yang berisi ikon dan label yang dapat mengarahkan pengguna ke halaman yang berbeda.
 *
 * @param {ReactNode} icon - Ikon yang akan ditampilkan dalam item.
 * @param {string} href - Tujuan halaman saat mengklik item.
 * @param {string} label - Label yang menunjukkan keterangan item (misal: Beranda, Profil, dll).
 */

interface ItemTopBarProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const ItemTopBar = ({ icon, href, label }: ItemTopBarProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const active =
    href !== "/dashboard"
      ? pathName === href || pathName.includes(href)
      : pathName === href;

  const colorClass = active
    ? "border-b-2 border-lime-600 dark:border-gray-700"
    : "";

  const colorIcon = active
    ? "text-lime-600 dark:text-white font-bold"
    : "text-gray-400 dark:text-gray-200";

  const colotText = active ? "text-lime-500 dark:text-white" : "";

  return (
    <div
      title={label}
      onClick={() => router.push(href)}
      className={`flex flex-col justify-center items-center cursor-pointer ${colorClass}`}
    >
      <div className={`text-2xl ${colorIcon}`}>{icon}</div>
      {active && <p className={`text-xs ${colotText}`}>{label}</p>}
    </div>
  );
};

export default ItemTopBar;
