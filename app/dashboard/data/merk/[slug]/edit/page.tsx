import { HeaderAndBackIcon } from "@/src/components/molecules";
import { FormEditData } from "@/src/template";

export default function EditBrand({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Merk",
      name: "nama",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Brand" />
      <FormEditData
        submitEndpoint={`/merk-barang/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
