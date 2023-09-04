"use client";
import {
  BackIcon,
  Button,
  Heading,
  Input,
  SwitchButton,
} from "@/layouts/components/atoms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostDataApi } from "@/utils";
import { Loading, Notify } from "notiflix";
import {
  IconSelect,
  ImageInputWithPreview,
} from "@/layouts/components/molecules";
import { TextfieldGroup } from "@/layouts/components/organisms";

export default function FormBarang() {
  const router = useRouter();
  const [data, setdata] = useState({} as any);
  const [error, seterror] = useState({} as any);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [promo, setPromo] = useState(false);
  const [hargaPromo, setHargaPromo] = useState(0);
  const [penggunaanUmum, setPenggunaanUmum] = useState([] as string[]);
  const [areaPenggunaan, setAreaPenggunaan] = useState([] as string[]);
  const [gambar, setGambar] = useState([] as string[]);

  const penggunaanUmumOptions = ["Lantai", "Dinding"];
  const areaPenggunaanOptions = [
    "Dalam Rumah",
    "Teras",
    "Garasi",
    "Kolam Renang",
    "Kamar Mandi",
    "Dapur",
  ];

  const handleSubmit = async (event: any) => {
    Loading.hourglass();
    event.preventDefault();

    const payload = {
      ...data,
      harga: hargaBeli,
      promo: promo,
      harga_promo: hargaPromo,
      penggunaan_umum: penggunaanUmum,
      area_penggunaan: areaPenggunaan,
      images: gambar,
    };

    try {
      const response = await PostDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang`,
        payload
      );
      if (response.status === 200 || response.status === 201) {
        Notify.success(response.message);
        router.push("/dashboard/products/barang");
        Loading.remove();
      } else {
        seterror(response.error);
        Notify.failure(response.message);
        Loading.remove();
      }
    } catch (error: any) {
      Notify.failure("Terjadi kesalahan saat menambahkan data");
    }
    Loading.remove();
  };

  const formInput = [
    {
      type: "text",
      label: "Nama Barang",
      name: "nama_barang",
      autoFocus: true,
    },
    {
      type: "select-api",
      label: "Kategori Barang",
      name: "kategori",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/kategori`,
      keyValue: ["slug", "nama_kategori"],
      useName: true,
    },
    {
      type: "select-api",
      label: "Brand",
      name: "brand",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/suplier/brand`,
      keyValue: ["slug", "nama_brand"],
      useName: true,
    },
    {
      type: "select-api",
      label: "Ukuran",
      name: "ukuran",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/ukuran`,
      keyValue: ["slug", "nama_ukuran"],
      useName: true,
    },
    {
      type: "select-api",
      label: "Motif",
      name: "motif",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/motif`,
      keyValue: ["slug", "nama_motif"],
      useName: true,
    },
    {
      type: "select-api",
      label: "Tekstur",
      name: "tekstur",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/tekstur`,
      keyValue: ["slug", "nama_tekstur"],
      useName: true,
    },
    {
      type: "select-api",
      label: "Kualitas",
      name: "kualitas",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/kualitas`,
      keyValue: ["slug", "nama_kualitas"],
      useName: true,
    },
    {
      type: "select-api",
      label: "Warna",
      name: "warna",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/warna`,
      keyValue: ["slug", "nama_warna"],
      useName: true,
    },
    {
      type: "number",
      label: "Berat barang",
      name: "berat",
    },
    {
      type: "number",
      label: "Stok Barang",
      name: "stok",
    },
  ];

  return (
    <div>
      <div className="flex items-center">
        <BackIcon />
        <Heading>Tambah Barang</Heading>
      </div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="shadow p-2 rounded mb-4 bg-white dark:bg-slate-800">
          <p className="font-bold underline">Detail Barang :</p>
          <TextfieldGroup
            error={error}
            form={formInput}
            setData={setdata}
            data={data}
          />
        </div>
        <div className="shadow p-2 rounded mt-5 bg-white dark:bg-slate-800">
          <p className="font-bold underline">Detail Harga :</p>
          <Input
            label="Harga"
            name="harga"
            type="number"
            value={hargaBeli}
            onChange={(event) => setHargaBeli(event.target.value)}
          />
          <div className="my-3">
            <SwitchButton title="Promo" enabled={promo} setEnabled={setPromo} />
          </div>
        </div>
        {promo && (
          <div className="shadow p-2 rounded mt-2 bg-white dark:bg-slate-800">
            <Input
              label="Harga Promo"
              name="harga_promo"
              type="number"
              value={hargaPromo}
              onChange={(event) => setHargaPromo(event.target.value)}
            />
          </div>
        )}
        <div className="shadow p-2 rounded mt-5 bg-white dark:bg-slate-800">
          <p className="font-bold underline">Detail Gambar :</p>
          <ImageInputWithPreview gambar={gambar} setGambar={setGambar} />
        </div>
        <div className="shadow p-2 rounded mt-5 bg-white dark:bg-slate-800">
          <p className="font-bold underline">Penggunaan Umum :</p>
          <div className="flex space-x-4 my-2">
            <IconSelect
              options={penggunaanUmumOptions}
              selected={penggunaanUmum}
              setSelected={setPenggunaanUmum}
            />
          </div>
        </div>
        <div className="shadow p-2 rounded mt-5 bg-white dark:bg-slate-800">
          <p className="font-bold underline">Area Penggunaan :</p>
          <div className="flex space-x-4 my-2">
            <IconSelect
              options={areaPenggunaanOptions}
              selected={areaPenggunaan}
              setSelected={setAreaPenggunaan}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button isSubmit={true}>Simpan</Button>
        </div>
      </form>
    </div>
  );
}
