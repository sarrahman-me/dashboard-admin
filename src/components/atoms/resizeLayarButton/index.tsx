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
        className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 focus:outline-none text-lime-500 focus:ring-lime-600"
      >
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
}
