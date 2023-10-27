"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Komponen ItemSidebar digunakan untuk membuat list dengan icon untuk navigasi halaman dari sidebar
 *
 * @param {ReactNode} icon - Ikon yang akan ditampilkan dalam component.
 * @param {string} label - Label dari component ini
 * @param {boolean} expand - Expand adalah boolean yang menampilkan apakah sidebar sedang dibuka lebar atau tidak
 * @param {string} href - Halaman yang akan dituju saat mengklik component
 *
 */

interface ItemSidebarProps {
  label: string;
  icon: React.ReactNode;
  expand: boolean;
  href: string;
}

const ItemSidebar = ({ label, icon, href, expand }: ItemSidebarProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const active =
    href !== "/dashboard"
      ? pathName === href || pathName.includes(href)
      : pathName === href;

  const colorClass = active
    ? "bg-indigo-600 dark:bg-gray-700 text-white"
    : "hover:bg-indigo-50 dark:hover:bg-gray-700";

  const colorIcon = active ? "text-white" : "text-gray-600 dark:text-gray-200";

  return (
    <div
      title={label}
      onClick={() => router.push(href)}
      className={`flex w-full my-3 p-3 cursor-pointer rounded-md items-center ${colorClass}`}
    >
      <div className={`text-xl ${colorIcon}`}>{icon}</div>
      {expand && <p className="font-medium ml-3">{label}</p>}
    </div>
  );
};

export default ItemSidebar;
