import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormEditData } from "@/src/template";

export default function EditMotif({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Motif",
      name: "nama",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Motif" />
      <FormEditData
        submitEndpoint={`/motif-barang/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
