import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditTipeTransaksi({
  params,
}: {
  params: { slug: string };
}) {
  const form = [
    {
      type: "text",
      label: "Nama Tipe",
      name: "nama_tipe_transaksi",
      autoFocus: true,
    },
    {
      type: "select-api",
      label: "Kategori transaksi",
      name: "id_kategori_transaksi",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/finance/kategori`,
      keyValue: ["id", "nama_kategori_transaksi"],
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Tipe" />
      <FormEditData
        submitEndpoint={`/finance/tipe/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
