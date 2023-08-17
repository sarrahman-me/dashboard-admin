import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormEditData } from "@/src/template";

export default function EditKualitas({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Kualitas",
      name: "nama_kualitas",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Kualitas" />
      <FormEditData
        submitEndpoint={`/products/kualitas/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
