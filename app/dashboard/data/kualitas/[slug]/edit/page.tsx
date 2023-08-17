import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormEditData } from "@/src/template";

export default function EditKualitas({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Kualitas",
      name: "nama",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Kualitas" />
      <FormEditData
        submitEndpoint={`/kualitas-barang/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
