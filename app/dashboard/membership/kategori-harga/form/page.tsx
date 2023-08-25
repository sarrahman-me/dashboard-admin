import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function FormKategoriHarga() {
  const form = [
    {
      type: "text",
      label: "Nama Harga",
      name: "nama_kategori_harga",
      autoFocus: true,
    },
    {
      type: "number",
      label: "Persentase",
      name: "persentase",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Kategori Harga" />
      <FormData submitEndpoint={"/membership/harga"} formInput={form} />
    </div>
  );
}
