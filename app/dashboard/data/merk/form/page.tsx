import { FormData } from "@/src/template";
import { HeaderAndBackIcon } from "@/src/components/molecules";

export default function FormMerk() {
  const form = [
    {
      type: "text",
      label: "Nama Merk",
      name: "nama",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Merk" />
      <FormData submitEndpoint={"/merk-barang"} formInput={form} />
    </div>
  );
}
