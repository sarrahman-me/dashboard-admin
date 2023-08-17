import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormEditData } from "@/src/template";

export default function EditTekstur({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Tekstur",
      name: "nama",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Tekstur" />
      <FormEditData
        submitEndpoint={`/tekstur-barang/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
