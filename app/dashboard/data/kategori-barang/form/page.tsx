import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormData } from "@/src/template";

export default function FormKategoriBarang() {
  const form = [
    {
      type: "text",
      label: "Nama Kategori Barang",
      name: "nama",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Kategori Barang" />
      <FormData submitEndpoint={"/kategori-barang"} formInput={form} />
    </div>
  );
}
