"use client";
import { DataTable, IconButton } from "@/src/components";
import { DeleteDataApi } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { CiEdit, CiTrash } from "react-icons/ci";
import { PiArrowSquareUpRightLight } from "react-icons/pi";

export default function Brand() {
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
          `${process.env.NEXT_PUBLIC_HOST}/suplier/brand/${slug}`
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
      label: "Nama Brand",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.nama_brand}
          <PiArrowSquareUpRightLight className="ml-1" />
        </p>
      ),
    },
    {
      label: "Suplier",
      renderCell: async (item: any) => item.suplier,
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
        title="Brand"
        dataEndpoint="/suplier/brand"
        columns={columns}
      />
    </div>
  );
}
