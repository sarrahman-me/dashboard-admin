import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormData } from "@/src/template";

export default function FormUkuran() {
  const form = [
    {
      type: "text",
      label: "Nama Ukuran",
      name: "nama_ukuran",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Ukuran" />
      <FormData submitEndpoint={"/products/ukuran"} formInput={form} />
    </div>
  );
}
