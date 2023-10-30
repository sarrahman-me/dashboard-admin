"use client";
import { DataTable, IconButton } from "@/src/components";
import { DeleteDataApi } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { CiEdit, CiTrash } from "react-icons/ci";

export default function Ukuran() {
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
          `${process.env.NEXT_PUBLIC_HOST}/products/Ukuran/${slug}`
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
      label: "Nama Ukuran",
      renderCell: async (item: any) => item.nama_ukuran,
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
        title="Ukuran"
        dataEndpoint="/products/ukuran"
        columns={columns}
      />
    </div>
  );
}
