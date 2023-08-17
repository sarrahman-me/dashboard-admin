"use client";
import { useEffect, useState } from "react";
import { TableWithAddButton } from "@/src/components/organisms";
import { RiSearchLine } from "react-icons/ri";
import { GetDataApi } from "@/src/utils";
import { Block, Notify } from "notiflix";

export default function Barang() {
  const [searchTerm, setSearchTerm] = useState("");
  const [barang, setBarang] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?page=1&limit=25`
      );
      setBarang(data?.data);
    };

    fetchData();
  }, []);

  const handleSearch = async (event: any) => {
    Block.hourglass("#table");
    event.preventDefault();
    try {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/barang/search?query=${searchTerm}`
      );
      if (response.status === 400) {
        Block.remove("#table");
        Notify.failure(response.message);
      }
      if (response.status === 500) {
        Block.remove("#table");
        Notify.failure(response.message + ", Coba Lagi!");
      }
      Block.remove("#table");
      setBarang(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div>
      <form
        className="flex justify-center items-center py-8"
        onSubmit={handleSearch}
      >
        <div className="relative flex items-center w-3/4">
          <input
            type="text"
            placeholder="Cari barang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-2 rounded-md shadow shadow-sky-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-sky-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
          />
          <button
            type="submit"
            className="absolute right-0 mr-2 p-2 rounded-md bg-transparent border-none cursor-pointer focus:outline-none"
          >
            <RiSearchLine size={20} />
          </button>
        </div>
      </form>
      <div id="table">
        <TableWithAddButton
          data={barang}
          title={"Barang"}
          dataKey={["nama_barang", "stok", "kualitas", "harga"]}
          titleColumns={["Nama Barang", "Stok", "Kualitas", "Harga"]}
        />
      </div>
    </div>
  );
}
