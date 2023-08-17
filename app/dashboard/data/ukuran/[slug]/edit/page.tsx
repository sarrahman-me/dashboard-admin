import { FormEditData } from "@/src/template";
import { HeaderAndBackIcon } from "@/src/components/molecules";

export default function EditUkuran({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Ukuran",
      name: "nama",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Ukuran" />
      <FormEditData
        submitEndpoint={`/ukuran-barang/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
