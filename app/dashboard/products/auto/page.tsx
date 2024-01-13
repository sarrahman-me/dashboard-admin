"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { PatchDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import { Button } from "@/src/components";
import { MdAutoMode } from "react-icons/md";

const FileUpload = () => {
  const [csvData, setCsvData] = useState<Array<{ Tag: string; Stok: number }>>(
    []
  );
  const [tagFailed, setTagFailed] = useState([] as string[]);
  const [productUpdated, setProductUpdated] = useState([] as string[]);
  const [processing, setProcessing] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);

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
    setProcessing(true);
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
        setSuccessCount((prev) => prev + 1);
      } else {
        console.log(response.message);
        setTagFailed((prev) => [...prev, tag]);
        setFailedCount((prev) => prev + 1);
      }
    } catch (error) {
      Notify.failure("Terjadi kesalahan tak terduga");
    } finally {
      setProcessing(false);
    }
    setTotalProcessed((prev) => prev + 1);
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
        <Button
          onClick={() => processCsvData()}
          icon={<MdAutoMode />}
          loading={processing}
        >
          Proses Data
        </Button>
      </div>

      {processing && (
        <div className="w-full mt-2">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lime-600 bg-lime-200">
                  Proses Berlangsung
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-lime-600">
                  {Math.round((totalProcessed / csvData.length) * 100)}%
                </span>
              </div>
            </div>
            <div className="flex mb-2 items-center justify-start">
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-lime-600 h-2 rounded-full"
                  style={{
                    width: `${(totalProcessed / csvData.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-2">
        <p className="text-lg font-semibold mt-4">Summary:</p>
        <div className="flex space-x-4 mt-2">
          <div>
            <p className="text-green-500 text-sm font-medium">
              Berhasil: {successCount}
            </p>
            <div>
              {productUpdated.map((tag: string, i: any) => (
                <p key={i} className="text-green-500 text-xs">
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-red-500 text-sm font-medium">
              Gagal: {failedCount}
            </p>
            <div>
              {tagFailed.map((tag: string, i: any) => (
                <p key={i} className="text-red-500 text-xs">
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
