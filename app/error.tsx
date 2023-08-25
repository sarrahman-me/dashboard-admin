"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-indigo-500">
      <div className="text-center">
        <Player
          autoplay
          loop
          src="https://lottie.host/502d7279-05fa-43a4-ab37-64795e8b6bd6/azu0nfAoBC.json"
          style={{ height: "300px", width: "300px" }}
        >
          <Controls buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
        <h2 className="text-white md:text-lg font-bold mt-8">
          Maaf, terjadi kesalahan saat terhubung ke server!
        </h2>
        <p className="text-left text-white text-sm md:text-base mt-4">
          Mohon coba beberapa langkah berikut:
        </p>
        <ul className="text-white text-base mt-4 text-left">
          <li className="flex items-start">
            <span className="mr-2">&#8226;</span>
            Periksa koneksi internet Anda
          </li>
          <li className="flex items-start">
            <span className="mr-2">&#8226;</span>
            Klik tombol refresh pada halaman ini
          </li>
          <li className="flex items-start">
            <span className="mr-2">&#8226;</span>
            Kembali ke halaman sebelumnya lalu refresh
          </li>
          <li className="flex items-start">
            <span className="mr-2">&#8226;</span>
            Hubungi tim teknis kami
          </li>
        </ul>
        <button
          onClick={() => reset()}
          className="bg-white text-indigo-500 px-6 py-2 rounded-full mt-6 hover:bg-indigo-500 hover:text-white transition duration-300"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
