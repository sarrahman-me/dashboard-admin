import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/layouts/template";

export default function FormKategoriBarang() {
  const form = [
    {
      type: "text",
      label: "Nama Kategori Barang",
      name: "nama_kategori",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Kategori Barang" />
      <FormData submitEndpoint={"/products/kategori"} formInput={form} />
    </div>
  );
}
