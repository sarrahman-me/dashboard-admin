import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

export default function FormTekstur() {
  const form = [
    {
      type: "text",
      label: "Nama Tekstur",
      name: "nama_tekstur",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Tekstur" />
      <FormData submitEndpoint={"/products/tekstur"} formInput={form} />
    </div>
  );
}
