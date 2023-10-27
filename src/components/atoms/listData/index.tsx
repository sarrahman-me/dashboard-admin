"use client";
import React from "react";
import { FaDotCircle } from "react-icons/fa";
import Typography from "../Typography";

/**
 * Komponen ListData digunakan untuk menampilkan item dengan label dan nilainya.
 *
 * @param {string} label - Label untuk item.
 * @param {ReactNode} value - Nilai yang akan ditampilkan.
 */

interface ListDataProps {
  label: string;
  value: React.ReactNode;
}

export default function ListData({ label, value }: ListDataProps) {
  return (
    <div className="my-3 flex items-center">
      <div className="mr-2">
        <FaDotCircle className="text-slate-400" size="8px" />
      </div>
      <div>
        <Typography color="secondary">{label}</Typography>
        <Typography> {value || "-"}</Typography>
        <p className="font-semibold text-gray-700 dark:text-slate-50"></p>
      </div>
    </div>
  );
}
