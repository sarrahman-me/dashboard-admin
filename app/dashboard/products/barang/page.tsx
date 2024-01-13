/* eslint-disable @next/next/no-img-element */
"use client";
import { LuPencil } from "react-icons/lu";
import { DataTable, IconButton } from "@/src/components";
import { DeleteDataApi, PatchDataApi, formatCurrency } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { CiEdit, CiTrash } from "react-icons/ci";
import { PiArrowSquareUpRightLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

export default function Barang() {
  const router = useRouter();
  const pathname = usePathname();

  const handleRemove = (slug: string) => {
    Confirm.show(
      "Konfirmasi",
      "Yakin Ingin Menghapus Data?",
      "Hapus",
      "Batal",
      async () => {
        const response = await DeleteDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
        );
        Notify.success(response?.message);
        window.location.reload();
      },
      () => {},
      {
        okButtonBackground: "red",
        titleColor: "red",
      }
    );
  };

  const handleEditStok = (
    slug: string,
    currentStok: any,
    currentPrice: any
  ) => {
    Confirm.prompt(
      "Perubahan data",
      "Berapa stok terbaru?",
      currentStok,
      "Simpan",
      "Cancel",
      async (clientAnswer) => {
        const payload = {
          stok: Number(clientAnswer),
          harga: currentPrice,
        };

        try {
          const response = await PatchDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/products/barang/field/${slug}`,
            payload
          );
          if (response.status === 200 || response.status === 201) {
            Notify.success(response.message);
          } else {
            Notify.failure("gagal memperbarui stok");
          }
        } catch (error) {
          Notify.failure("Terjadi kesalahan saat menyimpan perubahan");
        }
      }
    );
  };

  const handleEditHarga = (
    slug: string,
    currentStok: any,
    currentPrice: any
  ) => {
    Confirm.prompt(
      "Perubahan data",
      "Berapa harga terbaru?",
      currentPrice,
      "Simpan",
      "Cancel",
      async (clientAnswer) => {
        const payload = {
          stok: currentStok,
          harga: Number(clientAnswer),
        };

        try {
          const response = await PatchDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/products/barang/field/${slug}`,
            payload
          );
          if (response.status === 200 || response.status === 201) {
            Notify.success(response.message);
          } else {
            Notify.failure("gagal memperbarui harga");
          }
        } catch (error) {
          Notify.failure("Terjadi kesalahan saat menyimpan perubahan");
        }
      }
    );
  };

  const columns = [
    {
      label: "Gambar",
      renderCell: async (item: any) => (
        <img
          src={item.images[0]}
          alt={item.slug}
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      label: "Nama",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.nama_barang} {item.warna?.replace(/\([^)]*\)/g, "").trim()}
          <PiArrowSquareUpRightLight className="ml-1" />
        </p>
      ),
    },
    {
      label: "Brand",
      renderCell: async (item: any) => item.brand,
    },
    {
      label: "Ukuran",
      renderCell: async (item: any) => item.ukuran,
    },
    {
      label: "Motif",
      renderCell: async (item: any) => item.motif,
    },
    {
      label: "Tekstur",
      renderCell: async (item: any) => item.tekstur,
    },
    {
      label: "Kualitas",
      renderCell: async (item: any) => item.kualitas,
    },
    {
      label: "Harga",
      renderCell: async (item: any) => (
        <div className="flex">
          <p>{formatCurrency(Number(item.harga))}</p>
          <LuPencil
            onClick={() => handleEditHarga(item.slug, item.stok, item.harga)}
            className="ml-2 text-slate-400 cursor-pointer hover:text-orange-400"
          />
        </div>
      ),
    },
    {
      label: "Stok",
      renderCell: async (item: any) => (
        <div className="flex">
          <p>{item.stok}</p>
          <LuPencil
            onClick={() => handleEditStok(item.slug, item.stok, item.harga)}
            className="ml-2 text-slate-400 cursor-pointer hover:text-orange-400"
          />
        </div>
      ),
    },
    {
      label: "Promo",
      renderCell: async (item: any) => (
        <div>
          {item.promo ? (
            <div className="flex justify-center">
              <TiTick className="text-green-500 text-lg" />
            </div>
          ) : (
            <div className="flex justify-center">
              <RxCross2 className="text-lg" />
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Tag",
      renderCell: async (item: any) => item.tag,
    },
    {
      label: "Edit",
      renderCell: async (item: any) => (
        <div className="flex justify-center">
          <IconButton
            size="small"
            color="warning"
            onClick={() => router.push(`${pathname}/${item.slug}/edit`)}
            icon={<CiEdit />}
          />
        </div>
      ),
    },
    {
      label: "Hapus",
      renderCell: async (item: any) => (
        <div className="flex justify-center">
          <IconButton
            size="small"
            color="danger"
            onClick={() => handleRemove(item.slug)}
            icon={<CiTrash />}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Barang"
        dataEndpoint="/products/barang"
        columns={columns}
      />
    </div>
  );
}
