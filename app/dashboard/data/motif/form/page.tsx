import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormData } from "@/src/template";

export default function FormMotif() {
  const form = [
    {
      type: "text",
      label: "Nama Motif",
      name: "nama",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Motif" />
      <FormData submitEndpoint={"/motif-barang"} formInput={form} />
    </div>
  );
}
