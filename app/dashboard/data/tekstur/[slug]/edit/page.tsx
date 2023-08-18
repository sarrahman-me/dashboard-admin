import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditTekstur({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Tekstur",
      name: "nama_tekstur",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Tekstur" />
      <FormEditData
        submitEndpoint={`/products/tekstur/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
