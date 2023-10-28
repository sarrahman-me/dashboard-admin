/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Label from "../Label";
import Typography from "../Typography";

/**
 * Komponen FileInput digunakan untuk mengunggah file dan, jika diaktifkan, menampilkan pratinjau file gambar.
 *
 * @param {string} label - Label yang ditampilkan di atas elemen input file.
 * @param {string} error - Pesan kesalahan yang ditampilkan jika terjadi kesalahan validasi.
 * @param {function} setFile - Fungsi yang dipanggil saat file dipilih untuk menyimpan file (dalam format base64 as string[]).
 * @param {boolean} previewFile - Jika benar, akan menampilkan pratinjau file gambar.
 */

interface FileInputProps {
  label?: string;
  error?: string;
  setFile: (files: string[]) => void;
  previewFile?: boolean;
}

const FileInput = ({ label, error, setFile, previewFile }: FileInputProps) => {
  // menyimpan kumpulan file untuk preview
  const [currentFile, setCurrentFile] = useState(
    [] as {
      file: string;
      name: string;
      type: string;
    }[]
  );

  //   merender preview dari file currentFile berdasarkan tipe file
  const renderFilePreview = () => {
    return currentFile.map((file, index) => {
      if (file.file !== "" && previewFile) {
        if (file.type.startsWith("image")) {
          // Jika tipe file adalah gambar, tampilkan gambar preview
          return (
            <div key={index} className="m-2">
              <img
                src={file.file}
                className="object-contain max-h-28 md:max-h-[155px] border"
                alt={file.name}
              />
            </div>
          );
        } else {
          // Jika tipe file bukan gambar, Anda bisa menambahkan logika khusus di sini
          return (
            <div key={index} className="m-2">
              <Typography color="secondary" variant="helper">
                Tidak ada preview untuk {file.name}
              </Typography>
            </div>
          );
        }
      }
      return null;
    });
  };

  /**
   * Fungsi `handleFileChange` digunakan untuk menangani peristiwa perubahan elemen input file di dalam
   * aplikasi TypeScript React. Fungsi ini membaca file yang dipilih, mengonversinya menjadi string base64,
   * dan mengatur status file dan status file saat ini dengan string base64, nama file, dan jenis file.
   * @param {any} event - Parameter event adalah objek yang mewakili peristiwa yang memicu
   * perubahan berkas. Dalam hal ini, ini adalah objek peristiwa yang terkait dengan perubahan input file.
   */

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const nameFile = file.name;
      const typeFile = file.type;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        const newFile = {
          file: base64String,
          name: nameFile,
          type: typeFile,
        };

        const filteredImage = currentFile.map((f) => f.file);

        filteredImage.push(newFile.file);

        setFile(filteredImage);
        setCurrentFile([...currentFile, newFile]);
      };
      reader.readAsDataURL(file);
    }
  };

  //   "classNameFileInput" adalah style class tailwind untuk file input
  const classNameFileInput = `block w-full text-sm text-slate-500 file:cursor-pointer
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-lime-50 file:text-lime-700
        hover:file:bg-lime-100`;

  return (
    <div>
      {label && (
        <Label otherClass="mb-1" htmlFor="file-input">
          {label}
        </Label>
      )}
      <input
        onChange={handleFileChange}
        id="file-input"
        type="file"
        className={classNameFileInput}
      />
      <div className="flex flex-wrap">{renderFilePreview()}</div>
      {error && (
        <Typography variant="helper" color="danger">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default FileInput;
