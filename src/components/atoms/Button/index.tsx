import React from "react";

/**
 * Tombol yang dapat disesuaikan.
 *
 * @param {string} variant - Variasi tombol ("contained", "outlined", "text").
 * @param {string} size - Ukuran tombol ("medium", "small", "large", "full").
 * @param {string} type - Tipe tombol ("button", "reset", "submit").
 * @param {boolean} disabled - Apakah tombol dinonaktifkan.
 * @param {boolean} loading - Apakah tombol sedang dalam status "loading".
 * @param {function} onClick - Fungsi yang dipanggil saat tombol diklik.
 * @param {ReactNode} children - Konten tombol.
 * @param {ReactNode} icon - Ikon yang ditampilkan di samping teks tombol.
 */

interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  size?: "medium" | "small" | "large" | "full";
  type?: "button" | "reset" | "submit";
  disabled?: true | false;
  loading?: true | false;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = ({
  variant,
  children,
  size,
  type,
  disabled,
  loading,
  icon,
  onClick,
}: ButtonProps) => {
  /* mendefinisikan className tailwind CSS yang berbeda untuk setiap varian tombol. */

  const classVariant = {
    contained:
      "border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-800 disabled:bg-gray-500 disabled:border-none",

    outlined:
      "border-2 border-indigo-600 hover:shadow-md hover:border-indigo-500 disabled:border-gray-500",

    text: "hover:bg-slate-200 dark:hover:bg-slate-800",
  };

  const classSize = {
    small: "text-xs py-1 px-2",
    medium: "text-sm py-1.5 px-3",
    large: "text-base py-2 px-4",
    full: "w-full py-1.5 justify-center",
  };

  const defaultClass = `flex items-center font-medium rounded-md disabled:cursor-not-allowed transition`;

  const className = `
  ${defaultClass}
  ${classVariant[variant || "contained"]} 
  ${classSize[size || "medium"]}
  `;

  const classIcon = `ml-2 ${loading ? "animate-spin" : ""}`;

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={className}
    >
      {loading ? "Loading ..." : children}
      {icon && <span className={classIcon}>{icon}</span>}
    </button>
  );
};

export default Button;
