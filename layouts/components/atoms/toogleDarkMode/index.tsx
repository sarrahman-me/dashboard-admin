"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

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
    if (!rootElement) return; // Tidak ada elemen dengan ID "root"

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
        onClick={toggleDarkMode}
        className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-1 text-indigo-500 focus:ring-indigo-600"
      >
        <span
          className={`transform transition-transform duration-300 ${
            isDarkModeEnabled ? "scale-125" : "scale-100"
          }`}
        >
          {isDarkModeEnabled ? <FiSun /> : <FiMoon />}
        </span>
      </button>
    </div>
  );
}
