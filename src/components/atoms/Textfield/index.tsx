import React from "react";
import Typography from "../Typography";
import Label from "../Label";

/**
 * Komponen Textfield yang dapat disesuaikan.
 *
 * @param {string} name - Nama Textfield dalam string.
 * @param {string} variant - Variasi Textfield ("outlined", "standard").
 * @param {string} placeholder - Placeholder Textfield dalam string.
 * @param {string} label - Label Textfield dalam string.
 * @param {string} type - Tipe Textfield ("text", "number", "password", "date", "email").
 * @param {boolean} disabled - Apakah Textfield dinonaktifkan.
 * @param {boolean} autoFocus - Apakah Textfield mendapatkan fokus secara otomatis.
 * @param {string} value - Nilai yang diisi dalam Textfield.
 * @param {string} error - Pesan kesalahan yang ditampilkan di bawah Textfield (opsional).
 * @param {ReactNode} icon - Ikon yang ingin ditampilkan di dalam Textfield (opsional).
 * @param {function} onClickIcon - Fungsi yang dipanggil saat ikon di dalam Textfield diklik (opsional).
 * @param {boolean} fullWidth - Apakah Textfield harus memenuhi lebar penuh (opsional).
 */

interface TextfieldProps {
  name: string;
  type?: "text" | "number" | "password" | "date" | "email" | "tel" | string;
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange: (value: any) => void;
  variant?: "outlined" | "standard" | string;
  disabled?: true | false;
  autoFocus?: true | false;
  fullWidth?: true | false;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
  otherClass?: string;
}

const Textfield = ({
  placeholder,
  variant,
  type,
  disabled,
  value,
  onChange,
  onClickIcon,
  autoFocus,
  fullWidth,
  label,
  icon,
  error,
  name,
  otherClass,
}: TextfieldProps) => {
  /* Objek `classColorBorder` mendefinisikan kelas CSS yang berbeda untuk setiap border pada varian Textfield ketika error. */
  const classColorBorder = {
    default:
      "border-gray-600 hover:border-gray-600 focus:border-indigo-600 dark:focus:border-indigo-600",
    error:
      "border-red-600 hover:border-red-600 focus:border-red-600 dark:focus:border-red-600",
  };

  /* Objek `classVariant` mendefinisikan kelas CSS yang berbeda untuk setiap varian Textfield. */

  const classVariant: Record<string, string> = {
    outlined:
      "bg-white dark:bg-slate-800 border focus:border-2 focus:ring-indigo-600 dark:focus:ring-indigo-600 rounded-md  invalid:border-red-500",

    standard:
      "bg-transparent border-b focus:border-b-2 border-indigo-600 hover:border-indigo-600 invalid:border-b-red-500",
  };

  /* "defaultClass" adalah class tailwind yang ada di semua variant textfield */

  const defaultClass = `placeholder:select-none dark:placeholder-gray-400 p-2 focus:outline-none disabled:border-gray-500 disabled:cursor-not-allowed transition`;

  /* `Const className` membuat string yang berisi kelas CSS untuk komponen Textfield. */

  const className = `
      ${icon && "pr-8"}
      ${defaultClass}
      ${classVariant[variant || "outlined"]} 
      ${fullWidth ? "w-full" : ""}
      ${!error ? classColorBorder.default : classColorBorder.error}
      ${otherClass}
      `;

  return (
    <div className="flex flex-col">
      {label && (
        <Label otherClass="mb-1" htmlFor={name}>
          {label}
        </Label>
      )}
      <div className="relative flex items-center">
        <input
          id={name}
          value={value}
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={className}
          type={type}
        />
        {icon && (
          <div onClick={onClickIcon} className="relative flex items-center">
            <button type="submit" className="absolute right-3 text-indigo-600">
              {icon}
            </button>
          </div>
        )}
      </div>
      {error && (
        <Typography variant="helper" color="danger">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Textfield;
