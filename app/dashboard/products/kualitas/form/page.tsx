import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

export default function FormKualitas() {
  const form = [
    {
      type: "text",
      label: "Nama Kualitas",
      name: "nama_kualitas",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Kualitas" />
      <FormData submitEndpoint={"/products/kualitas"} formInput={form} />
    </div>
  );
}
