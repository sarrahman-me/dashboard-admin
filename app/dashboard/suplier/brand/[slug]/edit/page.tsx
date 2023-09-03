import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditBrand({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Brand",
      name: "nama_brand",
    },
    {
      type: "select-api",
      label: "Suplier",
      name: "id_suplier",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/suplier/pemasok`,
      keyValue: ["id", "nama_perusahaan"],
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
