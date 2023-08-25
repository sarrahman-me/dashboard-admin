import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditTransaksi({
  params,
}: {
  params: { slug: string };
}) {
  const form = [
    {
      type: "text",
      label: "Keterangan",
      name: "keterangan",
      autoFocus: true,
    },
    {
      type: "text",
      label: "nominal",
      name: "nominal",
    },
    {
      type: "select-api",
      label: "Tipe transaksi",
      name: "id_tipe_transaksi",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/finance/tipe`,
      keyValue: ["id", "nama_tipe_transaksi"],
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Transaksi" />
      <FormEditData
        submitEndpoint={`/finance/transaksi/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
