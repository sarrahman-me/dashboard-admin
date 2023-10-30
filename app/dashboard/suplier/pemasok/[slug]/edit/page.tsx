import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/src/components";

export default function EditSuplier({ params }: { params: { slug: string } }) {
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
      <HeaderAndBackIcon title="Edit Suplier" />
      <FormEditData
        submitEndpoint={`/suplier/pemasok/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
