import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function FormKategoriTransaksi() {
  const form = [
    {
      type: "text",
      label: "Nama Kategori",
      name: "nama_kategori_transaksi",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Kategori Transaksi" />
      <FormData submitEndpoint={"/finance/kategori"} formInput={form} />
    </div>
  );
}
