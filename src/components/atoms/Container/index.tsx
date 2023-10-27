"use client";
import React from "react";

/**
 * Komponen Container digunakan untuk mengelilingi elemen-elemen anak dengan bingkai dan gaya tertentu.
 *
 * @param {ReactNode} children - Elemen-elemen anak yang akan ditempatkan di dalam Container.
 * @param {string} otherClass - Kelas tambahan yang dapat ditambahkan ke Container.
 */
interface ContainerProps {
  children: React.ReactNode;
  otherClass?: string;
  onClick?: () => void;
}

const Container = ({ children, otherClass, onClick }: ContainerProps) => {
  // Menggabungkan kelas CSS standar dengan kelas tambahan (jika ada).
  const className = `border border-md dark:border-none rounded-md bg-white dark:bg-slate-800   ${otherClass}`;

  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default Container;
