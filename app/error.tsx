"use client"; // Error components must be Client Components
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
    <div className="flex justify-center items-center w-full h-screen">
      <div>
        <Player
          autoplay
          loop
          src="https://lottie.host/502d7279-05fa-43a4-ab37-64795e8b6bd6/azu0nfAoBC.json"
          style={{ height: "300px", width: "300px" }}
        >
          <Controls buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
        <h2 className="text-center pb-4">Maaf, terjadi kesalahan.!</h2>
        <button
          onClick={() => reset()}
          type={"button"}
          className={`w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`}
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
