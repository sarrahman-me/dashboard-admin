"use client";
import { useEffect, useState } from "react";
import Autocomplete from "../Autocomplete";
import { GetDataApi } from "@/utils";

/**
 * Komponen AutocompleteApi digunakan untuk mengambil data dari endpoint dan
 * mengintegrasikannya dengan komponen Autocomplete.
 *
 * @param {function} setValue - Fungsi yang dipanggil saat pengguna memilih opsi Autocomplete.
 * @param {any} value - Nilai yang saat ini dipilih dalam Autocomplete.
 * @param {string} endpointData - Endpoint dari mana data akan diambil.
 * @param {Object} keyValue - Objek yang berisi dua properti: `key` dan `value`.
 *   - key: Nama properti dalam objek data yang berfungsi sebagai kunci unik.
 *   - value: Nama properti dalam objek data yang digunakan untuk tampilan di Autocomplete.
 */

interface AutocompleteApiProps {
  setValue: (item: string) => void;
  value: any;
  endpointData: string;
  keyValue: {
    key: string;
    value: string;
  };
}

const AutocompleteApi = ({
  keyValue,
  endpointData,
  value,
  setValue,
}: AutocompleteApiProps) => {
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(endpointData);
      setData(response.data);
    };
    fetchData();
  }, [endpointData]);

  return (
    <div>
      <Autocomplete
        value={value}
        setValue={setValue}
        lists={data}
        keyValue={keyValue}
      />
    </div>
  );
};

export default AutocompleteApi;
