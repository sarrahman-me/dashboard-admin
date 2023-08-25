"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import {
  BackIcon,
  EditDataIcon,
  Heading,
  ListData,
  RemoveDataIcon,
} from "@/layouts/components/atoms";
import { GetDataApi, PatchDataApi } from "@/utils";
import moment from "moment";
import { FaPen } from "react-icons/fa";
import { Confirm, Notify } from "notiflix";

async function fetchBarangData(slug: string) {
  const response = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
  );
  return response.data;
}

function DetailBarang({ params }: { params: { slug: string } }) {
  const [barang, setBarang] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBarangData(params.slug);
      setBarang(data);
    };

    fetchData();
  }, [params.slug]);

  const handleEditStok = (slug: string, currentStok: any) => {
    Confirm.prompt(
      "Perubahan data",
      "Berapa stok terbaru?",
      currentStok,
      "Simpan",
      "Cancel",
      async (clientAnswer) => {
        const payload = {
          ...barang,
          stok: Number(clientAnswer),
        };

        try {
          const response = await PatchDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`,
            payload
          );
          if (response.status === 200 || response.status === 201) {
            Notify.success(response.message);
            setBarang(payload);
          } else {
            Notify.failure("gagal memperbarui stok");
          }
        } catch (error) {
          Notify.failure("Terjadi kesalahan saat menyimpan perubahan");
        }
      }
    );
  };

  const handleEditHarga = (slug: string, currentPrice: any) => {
    Confirm.prompt(
      "Perubahan data",
      "Berapa harga terbaru?",
      currentPrice,
      "Simpan",
      "Cancel",
      async (clientAnswer) => {
        const payload = {
          ...barang,
          harga: Number(clientAnswer),
        };

        try {
          const response = await PatchDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`,
            payload
          );
          if (response.status === 200 || response.status === 201) {
            Notify.success(response.message);
            setBarang(payload);
          } else {
            Notify.failure("gagal memperbarui harga");
          }
        } catch (error) {
          Notify.failure("Terjadi kesalahan saat menyimpan perubahan");
        }
      }
    );
  };

  if (!barang) {
    return <div>Loading...</div>;
  }

  return (
    <div className="select-text">
      <div className="flex items-center">
        <BackIcon />
        <Heading>Detail Barang</Heading>
      </div>
      <div className="flex md:flex-row flex-col shadow rounded my-3 p-2 bg-white dark:bg-slate-800">
        <div className="w-1/3 flex justify-center">
          <img
            className="w-36 h-36 border"
            src={barang.images[0]}
            alt={barang.nama_barang}
          />
        </div>
        <div className="flex flex-col justify-around">
          <p className="text-xl font-bold">{barang.nama_barang}</p>
          <ListData label="Brand" value={barang.brand} />
          <span className="inline-flex items-center">
            <ListData label="Stok" value={barang.stok} />
            <FaPen
              onClick={() => handleEditStok(params.slug, barang.stok)}
              className="ml-2 text-slate-400 cursor-pointer hover:text-orange-400"
            />
          </span>
          <span className="inline-flex items-center">
            <ListData
              label="Harga"
              value={
                "Rp " + Number(barang.harga).toLocaleString("id-ID") + `/ dus`
              }
            />
            <FaPen
              onClick={() => handleEditHarga(params.slug, barang.harga)}
              className="ml-2 text-slate-400 cursor-pointer hover:text-orange-400"
            />
          </span>
        </div>
        <EditDataIcon />
        <RemoveDataIcon url={`/products/barang/${params.slug}`} />
      </div>
      {/* bagian keterangan */}
      <div className="shadow rounded my-3 p-2 dark:bg-slate-800 bg-white">
        <p className="font-bold">Informasi Barang:</p>
        <div className="md:pl-5 pl-2">
          <ListData label="Kategori" value={barang.kategori} />
          <ListData label="Ukuran" value={barang.ukuran} />
          <ListData label="Tekstur" value={barang.tekstur} />
          <ListData label="Motif" value={barang.motif} />
          <ListData
            label="Tanggal Masuk"
            value={moment(barang.createdAt).format("D - MM - YYYY")}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailBarang;
