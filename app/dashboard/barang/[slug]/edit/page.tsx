"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/src/components/atoms";
import { GetDataApi, PatchDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import {
  HeaderAndBackIcon,
  ImageInputWithPreview,
} from "@/src/components/molecules";
import { TextfieldGroup } from "@/src/components/organisms";

export default function EditBarang({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const slug = params.slug;
  const [data, setData] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [gambar, setGambar] = useState([] as string[]);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const response = await GetDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
          );
          setData(response.data);
          setHargaBeli(response.data.harga);
          setGambar(response.data.images);
        } catch (error) {
          Notify.failure("Terjadi kesalahan saat mengambil data barang");
        }
      };
      fetchData();
    }
  }, [slug]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const payload = {
      ...data,
      harga: hargaBeli,
      images: gambar,
    };

    try {
      const response = await PatchDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`,
        payload
      );
      if (response.status === 200 || response.status === 201) {
        Notify.success(response.message);
        router.push("/dashboard/barang");
      } else {
        setError(response.error);
        Notify.failure(response.error.message);
      }
    } catch (error) {
      Notify.failure("Terjadi kesalahan saat menyimpan perubahan");
    }
  };

  const formInput = [
    {
      type: "text",
      label: "Nama Barang",
      name: "nama_barang",
    },
    {
      type: "select-api",
      label: "Kategori Barang",
      name: "kategori",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/kategori`,
      keyValue: ["slug", "nama"],
    },
    {
      type: "select-api",
      label: "Merk",
      name: "merk",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/suplier/merk`,
      keyValue: ["slug", "nama"],
    },
    {
      type: "select-api",
      label: "Ukuran",
      name: "ukuran",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/ukuran`,
      keyValue: ["slug", "nama"],
    },
    {
      type: "select-api",
      label: "Motif",
      name: "motif",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/motif`,
      keyValue: ["slug", "nama"],
    },
    {
      type: "select-api",
      label: "Tekstur",
      name: "tekstur",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/tekstur`,
      keyValue: ["slug", "nama"],
    },
    {
      type: "select-api",
      label: "Kualitas",
      name: "kualitas",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/products/kualitas`,
      keyValue: ["slug", "nama"],
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
        <HeaderAndBackIcon title="Edit Barang" />
      </div>
      <form className="mt-5" onSubmit={handleSubmit}>
        {/* Form input untuk mengedit data barang */}
        <div className="shadow p-2 rounded mb-4">
          <p className="font-bold underline">Detail Barang:</p>
          <TextfieldGroup
            error={error}
            form={formInput}
            setData={setData}
            data={data}
          />
          {/* Tambahkan form input lainnya sesuai dengan kebutuhan */}
        </div>

        {/* Form input untuk mengedit harga */}
        <div className="shadow p-2 rounded mt-5">
          <p className="font-bold underline">Detail Harga:</p>
          <Input
            type="number"
            label="Harga"
            name="harga"
            value={hargaBeli}
            onChange={(event) => setHargaBeli(event.target.value)}
            error={error.harga}
          />
          {/* Tambahkan form input lainnya sesuai dengan kebutuhan */}
        </div>

        {/* Form input untuk mengedit gambar */}
        <div className="shadow p-2 rounded mt-5">
          <p className="font-bold underline">Detail Gambar:</p>
          <ImageInputWithPreview gambar={gambar} setGambar={setGambar} />
        </div>

        <div className="mt-4">
          <Button isSubmit={true}>Simpan Perubahan</Button>
        </div>
      </form>
    </div>
  );
}
