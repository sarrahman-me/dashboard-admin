"use client";
import { useEffect, useState } from "react";
import { GetDataApi } from "@/utils";

export default function SelectApi(props: {
  apiUrl: string;
  label: string;
  keyValue: string[];
  onChange: (value: string) => void;
  value: string;
  error?: string;
  useNameForValue?: boolean;
}) {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await GetDataApi(`${props.apiUrl}?limit=100`);
        const data = response.data;
        setOptions(data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    }
    fetchOptions();
  }, [props.apiUrl]);

  return (
    <div>
      <label
        htmlFor="select-option"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <select
        id="select-option"
        className={`bg-white border ${
          props.error ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option disabled value="">
          Pilihan opsi
        </option>
        {options.map((option) => (
          <option
            key={option[props.keyValue[0]]}
            value={option[props.keyValue[props.useNameForValue ? 1 : 0]]}
          >
            {option[props.keyValue[1]]}
          </option>
        ))}
      </select>
      {props.error && (
        <span className="text-red-500 text-sm">{props.error}</span>
      )}
    </div>
  );
}
