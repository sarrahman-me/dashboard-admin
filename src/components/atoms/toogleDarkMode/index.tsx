"use client";
import { useEffect, useState } from "react";
import { MdOutlineNightsStay, MdSunny } from "react-icons/md";

/**
 * Komponen ToggleDarkMode digunakan untuk mengaktifkan atau menonaktifkan mode gelap pada aplikasi. Ini juga menyimpan preferensi mode gelap di local storage dan mengganti tema aplikasi saat diperlukan.
 */

export default function ToggleDarkMode() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  useEffect(() => {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled");
    const rootElement = document.getElementById("root");

    if (darkModeEnabled === "true" && rootElement) {
      rootElement.classList.add("dark");
      setIsDarkModeEnabled(true);
    } else if (rootElement) {
      rootElement.classList.remove("dark");
      setIsDarkModeEnabled(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return; // Jika tidak ada elemen dengan ID "root"

    const isCurrentlyDarkModeEnabled = rootElement.classList.contains("dark");
    const newDarkModeEnabled = !isCurrentlyDarkModeEnabled;

    if (newDarkModeEnabled) {
      rootElement.classList.add("dark");
      localStorage.setItem("darkModeEnabled", "true");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("darkModeEnabled", "false");
    }

    setIsDarkModeEnabled(newDarkModeEnabled);
  };

  return (
    <div>
      <button
        title={isDarkModeEnabled ? "Terang" : "Gelap"}
        onClick={toggleDarkMode}
        className="flex items-center gap-2 p-2 rounded-md transition-colors duration-300 focus:outline-none text-indigo-500 "
      >
        <span
          className={`transform transition-transform duration-300 ${
            isDarkModeEnabled ? "scale-125" : "scale-100"
          }`}
        >
          {isDarkModeEnabled ? <MdSunny /> : <MdOutlineNightsStay />}
        </span>
      </button>
    </div>
  );
}
