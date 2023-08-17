import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormData } from "@/src/template";

export default function FormTekstur() {
  const form = [
    {
      type: "text",
      label: "Nama Tekstur",
      name: "nama",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Tekstur" />
      <FormData submitEndpoint={"/tekstur-barang"} formInput={form} />
    </div>
  );
}
