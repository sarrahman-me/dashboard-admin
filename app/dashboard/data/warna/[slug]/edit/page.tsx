import { FormEditData } from "@/src/template";
import { HeaderAndBackIcon } from "@/src/components/molecules";

export default function EditWarna({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Warna",
      name: "nama_warna",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Warna" />
      <FormEditData
        submitEndpoint={`/products/warna/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
