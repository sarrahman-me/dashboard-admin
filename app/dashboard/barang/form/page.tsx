"use client";
import { BackIcon, Button, Heading, Input } from "@/src/components/atoms";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostDataApi } from "@/src/utils";
import { Loading, Notify } from "notiflix";
import { ImageInputWithPreview } from "@/src/components/molecules";
import { TextfieldGroup } from "@/src/components/organisms";

export default function FormBarang() {
  const router = useRouter();
  const [data, setdata] = useState({} as any);
  const [error, seterror] = useState({} as any);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [gambar, setGambar] = useState([] as string[]);

  const handleSubmit = async (event: any) => {
    Loading.hourglass();
    event.preventDefault();

    const payload = {
      ...data,
      harga: hargaBeli,
      images: gambar,
    };

    try {
      const response = await PostDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang`,
        payload
      );
      if (response.status === 200 || response.status === 201) {
        Notify.success(response.message);
        router.push("/dashboard/barang");
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
    },
    {
      type: "select-api",
      label: "Merk",
      name: "merk",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/suplier/brand`,
      keyValue: ["slug", "nama_brand"],
    },
    {
      type: "select-api",
      label: "Ukuran",
      name: "ukuran",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/ukuran`,
      keyValue: ["slug", "nama_ukuran"],
    },
    {
      type: "select-api",
      label: "Motif",
      name: "motif",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/motif`,
      keyValue: ["slug", "nama_motif"],
    },
    {
      type: "select-api",
      label: "Tekstur",
      name: "tekstur",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/tekstur`,
      keyValue: ["slug", "nama_tekstur"],
    },
    {
      type: "select-api",
      label: "Kualitas",
      name: "kualitas",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/kualitas`,
      keyValue: ["slug", "nama_kualitas"],
    },
    {
      type: "select-api",
      label: "Warna",
      name: "warna",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/warna`,
      keyValue: ["slug", "nama_warna"],
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
        <div className="shadow p-2 rounded mb-4">
          <p className="font-bold underline">Detail Barang :</p>
          <TextfieldGroup
            error={error}
            form={formInput}
            setData={setdata}
            data={data}
          />
        </div>
        <div className="shadow p-2 rounded mt-5">
          <p className="font-bold underline">Detail Harga :</p>
          <Input
            label="Harga"
            name="harga"
            type="number"
            value={hargaBeli}
            onChange={(event) => setHargaBeli(event.target.value)}
          />
        </div>
        <div className="shadow p-2 rounded mt-5">
          <p className="font-bold underline">Detail Gambar :</p>
          <ImageInputWithPreview gambar={gambar} setGambar={setGambar} />
        </div>
        <div className="mt-4">
          <Button isSubmit={true}>Simpan</Button>
        </div>
      </form>
    </div>
  );
}
