"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { PatchDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import { Button } from "@/src/components";

const FileUpload = () => {
  const [csvData, setCsvData] = useState<Array<{ Tag: string; Stok: number }>>(
    []
  );
  const [tagFailed, setTagFailed] = useState([] as string[]);
  const [productUpdated, setProductUpdated] = useState([] as string[]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];

    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result: any) => {
          setCsvData(result.data);
          setProductUpdated([]);
          setTagFailed([]);
        },
      });
    } else {
      Notify.failure("Format file tidak valid. Harap unggah file CSV.");
    }
  };

  const handleEditStok = async (tag: string, stok: number) => {
    console.log(tag, "mulai memproses");
    try {
      const response = await PatchDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/tag`,
        {
          stok,
          tag,
        }
      );

      if (response.status === 200) {
        console.log(tag, "berhasil");
        setProductUpdated((prev) => [...prev, tag]);
      } else {
        console.log(response.message);
        setTagFailed((prev) => [...prev, tag]);
      }
    } catch (error) {
      Notify.failure("Terjadi kesalahan tak terduga");
    }
  };

  const processCsvData = async () => {
    for (const item of csvData) {
      const tag = item.Tag;
      const stok = item.Stok;

      if (tag && stok) {
        await handleEditStok(tag, stok);
      } else {
        console.error("format csv tidak valid");
      }
    }
  };

  return (
    <div>
      <p className="font-bold text-xl">Automated Update Products</p>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div className="my-2">
        <Button onClick={() => processCsvData()}>Proses Data</Button>
      </div>
      {productUpdated.length > 0 && (
        <div className="my-2">
          <p>tag yang berhasil di proses</p>
          <div>
            {productUpdated.map((tag: string, i: any) => (
              <p key={i} className="text-green-500 text-xs">
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}

      {tagFailed.length > 0 && (
        <div className="my-2">
          <p>tag yang gagal di proses</p>
          <div>
            {tagFailed.map((tag: string, i: any) => (
              <p key={i} className="text-red-500 text-xs">
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
