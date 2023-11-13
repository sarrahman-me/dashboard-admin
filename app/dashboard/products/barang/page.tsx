"use client";
import { DataTable, IconButton } from "@/src/components";
import { DeleteDataApi, formatCurrency } from "@/src/utils";
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

  const columns = [
    {
      label: "Nama",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.nama_barang}
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
      label: "Warna",
      renderCell: async (item: any) => item.warna,
    },
    {
      label: "Harga",
      renderCell: async (item: any) => (
        <p>{formatCurrency(Number(item.harga))}</p>
      ),
    },
    {
      label: "Stok",
      renderCell: async (item: any) => item.stok,
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
