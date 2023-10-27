"use client";
import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Loading, Notify } from "notiflix";
import { Textfield } from "../../atoms";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    Loading.dots("Mencari...");

    if (!searchTerm) {
      Loading.remove();
      Notify.warning("Masukkan kata kunci pencarian");
      return;
    }

    router.push(`/dashboard/barang/pencarian?query=${searchTerm}`);

    Loading.remove();
  };

  return (
    <div className="flex justify-center items-center py-2">
      <form onSubmit={handleSearch} className="w-full md:w-2/3">
        <Textfield
          placeholder="Cari barang..."
          name={"search"}
          fullWidth
          icon={<RiSearchLine />}
          onChange={(value) => setSearchTerm(value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
