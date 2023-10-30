// import { ReadDataTableApi } from "@/layouts/template";

// export default function Suplier() {
//   return (
//     <ReadDataTableApi
//       title={"Suplier"}
//       dataKey={["nama_perusahaan"]}
//       titleColumns={["Nama Perusahaan"]}
//       dataEndpoint={"/suplier/pemasok"}
//     />
//   );
// }

"use client";
import { DataTable, IconButton } from "@/src/components";
import { DeleteDataApi } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { CiEdit, CiTrash } from "react-icons/ci";
import { PiArrowSquareUpRightLight } from "react-icons/pi";

export default function Suplier() {
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
          `${process.env.NEXT_PUBLIC_HOST}/suplier/pemasok/${slug}`
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
      label: "Nama Perusahaan",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.nama_perusahaan}
          <PiArrowSquareUpRightLight className="ml-1" />
        </p>
      ),
    },
    {
      label: "Whatsapp",
      renderCell: async (item: any) => item.whatsapp,
    },
    {
      label: "Kota",
      renderCell: async (item: any) => item.kota,
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
        title="Suplier"
        dataEndpoint="/suplier/pemasok"
        columns={columns}
      />
    </div>
  );
}
