import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditBrand({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Brand",
      name: "nama_brand",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Brand" />
      <FormEditData
        submitEndpoint={`/suplier/brand/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
