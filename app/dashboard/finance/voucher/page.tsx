"use client";
import { DataTable, IconButton } from "@/src/components";
import { DeleteDataApi, formatKeteranganWaktu } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { CiEdit, CiTrash } from "react-icons/ci";

export default function Voucher() {
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
          `${process.env.NEXT_PUBLIC_HOST}/finance/voucher/${slug}`
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
      renderCell: async (item: any) => item.name,
    },
    {
      label: "Code",
      renderCell: async (item: any) => item.code,
    },
    {
      label: "Berakhir",
      renderCell: async (item: any) => <p>{formatKeteranganWaktu(item.exp_date)}</p>,
    },
    {
      label: "Edit",
      renderCell: async (item: any) => (
        <div className="flex justify-center">
          <IconButton
            size="small"
            color="warning"
            onClick={() => router.push(`${pathname}/${item.code}/edit`)}
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
            onClick={() => handleRemove(item.code)}
            icon={<CiTrash />}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Voucher"
        dataEndpoint="/finance/voucher"
        columns={columns}
      />
    </div>
  );
}
