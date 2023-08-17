import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormData } from "@/src/template";

export default function FormWarna() {
  const form = [
    {
      type: "text",
      label: "Nama Warna",
      name: "nama_warna",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Warna" />
      <FormData submitEndpoint={"/products/warna"} formInput={form} />
    </div>
  );
}
