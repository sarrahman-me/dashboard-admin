"use client";
import { Switch } from "@headlessui/react";
import Label from "../Label";

/**
 * Komponen SwitchToggle digunakan untuk membuat tombol toggle yang dapat mengganti nilai boolean.
 *
 * @param {boolean} value - Nilai boolean yang akan diatur oleh tombol toggle.
 * @param {function} setValue - Fungsi yang akan dipanggil saat tombol toggle diubah.
 * @param {string} label - Label yang mendeskripsikan fungsi dari tombol toggle (opsional).
 */

interface SwitchProps {
  setValue: (e: any) => void;
  value: boolean;
  label?: string;
}

const SwitchToggle = ({ value, setValue, label }: SwitchProps) => {
  return (
    <div className="flex items-center">
      <Switch
        checked={value}
        onChange={setValue}
        className={`${
          value ? "bg-lime-600" : "bg-gray-200 dark:bg-slate-800"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      {label && <Label otherClass="ml-2">{label}</Label>}
    </div>
  );
};

export default SwitchToggle;
