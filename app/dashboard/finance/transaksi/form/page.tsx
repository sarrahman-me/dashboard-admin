import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function FormTransaksi() {
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
      name: "tipe_transaksi",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/finance/tipe`,
      keyValue: ["slug", "nama_tipe_transaksi"],
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Transaksi" />
      <FormData submitEndpoint={"/finance/transaksi"} formInput={form} />
    </div>
  );
}
