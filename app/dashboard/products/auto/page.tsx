"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { PatchDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import { Button } from "@/src/components";
import { MdAutoMode } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";

const FileUpload = () => {
  const [csvData, setCsvData] = useState<Array<{ Tag: string; Stok: number }>>(
    []
  );
  const [tagFailed, setTagFailed] = useState([] as string[]);
  const [productUpdated, setProductUpdated] = useState([] as string[]);
  const [processing, setProcessing] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [inValidCount, setInValidCount] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

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
      setEndTime(new Date()); // Catat waktu akhir proses
    }
    setTotalProcessed((prev) => prev + 1);
  };

  const processCsvData = async () => {
    if (!startTime) {
      setStartTime(new Date()); // Catat waktu awal proses
    }
    for (const item of csvData) {
      const tag = item.Tag;
      const stok = item.Stok;

      if (
        tag &&
        stok !== undefined &&
        stok !== null &&
        typeof stok === "number" &&
        !isNaN(stok)
      ) {
        await handleEditStok(tag, stok);
      } else {
        console.error("format csv tidak valid");
        setInValidCount((prev) => prev + 1);
        setTotalProcessed((prev) => prev + 1);
      }
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const duration = endTime.getTime() - startTime.getTime();
      const seconds = Math.floor(duration / 1000);
      return seconds;
    }
    return 0;
  };

  return (
    <div>
      <p className="font-bold text-xl">Automated Update Products</p>
      <input className="my-2" type="file" accept=".csv" onChange={handleFileUpload} />
      <div className="my-2 space-x-2 flex items-center">
        <Button
          onClick={() => processCsvData()}
          icon={<MdAutoMode />}
          loading={processing}
        >
          Proses Data
        </Button>
        <Button
          onClick={() => window.location.reload()}
          icon={<LuTimerReset />}
          disabled={processing}
          variant="outlined"
        >
          Reset
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
        <p className="text-lg font-semibold mt-4">Ringkasan:</p>
        <div className="mt-2">
          {startTime && endTime && (
            <p className="text-xs">
              Dimulai pada: {startTime.toLocaleTimeString()}
              <br />
              Selesai pada: {endTime.toLocaleTimeString()}
              <br />
              Durasi: {calculateDuration()} detik
            </p>
          )}
        </div>
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
          <div>
            <p className="text-red-500 text-sm font-medium">
              Invalid: {inValidCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
