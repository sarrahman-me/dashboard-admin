import { FormData } from "@/src/template";
import { HeaderAndBackIcon } from "@/src/components/molecules";

export default function FormKualitas() {
  const form = [
    {
      type: "text",
      label: "Nama Kualitas",
      name: "nama",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Kualitas" />
      <FormData submitEndpoint={"/kualitas-barang"} formInput={form} />
    </div>
  );
}
