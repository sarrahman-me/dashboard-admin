import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

export default function FormMotif() {
  const form = [
    {
      type: "text",
      label: "Nama Motif",
      name: "nama_motif",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Motif" />
      <FormData submitEndpoint={"/products/motif"} formInput={form} />
    </div>
  );
}
