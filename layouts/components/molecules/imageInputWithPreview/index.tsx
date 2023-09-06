"use client";
/* eslint-disable @next/next/no-img-element */
import { FaTrash, FaExclamationCircle } from "react-icons/fa";
import ImageInput from "../../atoms/inputImage";
import { useState } from "react";

export default function ImageInputWithPreview(props: {
  gambar: string[];
  setGambar: (i: any) => void;
}) {
  const [error, setError] = useState("");
  const handleImageChange = (base64Image: string) => {
    props.setGambar((prevGambar: any) => [...prevGambar, base64Image]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedGambar = [...props.gambar];
    updatedGambar.splice(index, 1);
    props.setGambar(updatedGambar);
  };

  return (
    <div className="my-5">
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        Gambar
      </label>
      <ImageInput onImageChange={handleImageChange} setError={setError} />
      <div className="mt-5 flex">
        {props.gambar.length > 0 ? (
          <div>
            {props.gambar.map((g: string, i: number) => (
              <div key={i} className="inline-block relative">
                <img className="border w-48 h-48 m-1" alt="gambar" src={g} />
                <FaTrash
                  className="text-red-500 hover:text-red-700 absolute top-1 right-1 cursor-pointer"
                  onClick={() => handleRemoveImage(i)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {error && (
        <p className="text-xs text-red-500">
          <FaExclamationCircle className="inline-block mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}
