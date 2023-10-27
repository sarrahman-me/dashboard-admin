import React from "react";

/**
 * Komponen Checkbox digunakan untuk membuat pilihan yang dapat dicentang atau tidak.
 *
 * @param {ReactNode} label - Label yang mendeskripsikan checkbox.
 * @param {string} name - Nama checkbox.
 * @param {boolean} value - Nilai checkbox (tercentang atau tidak).
 * @param {function} onChange - Fungsi yang dipanggil saat status checkbox berubah.
 * @param {boolean} disabled - Apakah checkbox dinonaktifkan (opsional).
 */

import Label from "../Label";

interface CheckboxProps {
  label: React.ReactNode;
  name: string;
  value: boolean;
  onChange: (item: boolean) => void;
  disabled?: boolean;
}

const Checkbox = ({
  label,
  name,
  value,
  disabled,
  onChange,
}: CheckboxProps) => {
  // Kelas CSS untuk styling checkbox

  const className =
    "w-4 h-4 text-indigo-600 bg-white dark:bg-slate-800 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center">
      <input
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        name={name}
        disabled={disabled}
        id={name}
        type="checkbox"
        className={className}
      />
      <Label otherClass="ml-2" htmlFor={name}>
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;
