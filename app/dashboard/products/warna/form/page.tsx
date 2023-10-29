import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

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
