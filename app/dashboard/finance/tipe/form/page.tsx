import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function FormTipeTransaksi() {
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
      <HeaderAndBackIcon title="Form Tipe" />
      <FormData submitEndpoint={"/finance/tipe"} formInput={form} />
    </div>
  );
}
