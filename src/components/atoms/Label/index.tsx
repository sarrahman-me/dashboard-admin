import React from "react";

/**
 * Komponen Label digunakan untuk membuat label yang terkait dengan elemen HTML lainnya.
 *
 * @param {ReactNode} htmlFor - ID elemen yang akan terkait dengan label.
 * @param {string} children - Konten teks label.
 * @param {string} otherClass - Kelas tambahan yang dapat diberikan pada label (opsional).
 *
 */

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  otherClass?: string;
}

const Label = ({ children, htmlFor, otherClass }: LabelProps) => {
  // Kelas CSS yang akan diterapkan pada label.

  const className = `text-sm font-medium select-none ${otherClass}`;

  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
