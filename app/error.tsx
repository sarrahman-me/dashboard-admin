"use client"; // Error components must be Client Components
import { Button } from "@/src/components/atoms";
import Image from "next/image";
import { useEffect } from "react";
import errorImage from "@/public/error.jpg";

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
        <Image src={errorImage} className="h-52 w-52" alt="error page" />
        <h2 className="text-center pb-4">Maaf, terjadi kesalahan.!</h2>
        <button
          onClick={() => reset()}
          type={"button"}
          className={`w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
