import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

export default function FormSuplier() {
  const form = [
    {
      type: "text",
      label: "Nama Perusahaan",
      name: "nama_perusahaan",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
    },
    {
      type: "number",
      label: "Whatsapp",
      name: "whatsapp",
    },
    {
      type: "text",
      label: "Kota",
      name: "kota",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah suplier" />
      <FormData submitEndpoint={"/suplier/pemasok"} formInput={form} />
    </div>
  );
}
