"use client";
import { useState } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";

export default function ResizeLayarButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      setIsFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      setIsFullscreen(true);
      var element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleFullScreen}
        className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
}
