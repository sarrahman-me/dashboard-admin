"use client";
import React from "react";

/**
 * Komponen ListIcon digunakan untuk menampilkan ikon dengan teks terkait.
 *
 * @param {string} text - Teks yang akan ditampilkan.
 * @param {string} textDecor - Gaya dekorasi teks (opsional). Pilihan: "garis-bawah", "garis-atas", "coret", "default".
 * @param {ReactNode} icon - Komponen ikon yang akan ditampilkan.
 * @param {string} iconColor - Warna ikon (opsional). Pilihan: "primary", "secondary", "danger", "success", "warning".
 */

interface ListIconProps {
  text: string;
  icon: React.ReactNode;
  textDecor?: "garis-bawah" | "garis-atas" | "coret" | "default" | string;
  iconColor?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | string;
}

const ListIcon = ({ text, textDecor, icon, iconColor }: ListIconProps) => {
  const classTextDecor: Record<string, string> = {
    ["garis-bawah"]: "underline",
    ["garis-atas"]: "overline",
    coret: "line-through",
    default: "",
  };

  const classColorIcon: Record<string, string> = {
    primary: "text-slate-950 dark:text-slate-50",
    secondary: "text-gray-600",
    danger: "text-red-600",
    success: "text-green-600",
    warning: "text-orange-600",
  };

  const classNameText = `
  text-sm md:text-base
  ${classTextDecor[textDecor || "default"]}
  `;

  const classNameIcon = `
  ${classColorIcon[iconColor || "primary"]}
  `;

  return (
    <li className="flex items-center space-x-3">
      <div className={classNameIcon}>{icon}</div>
      <span className={classNameText}>{text}</span>
    </li>
  );
};

export default ListIcon;
