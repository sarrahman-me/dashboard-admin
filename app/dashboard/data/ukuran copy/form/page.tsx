import react from "react";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/layouts/template";

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
