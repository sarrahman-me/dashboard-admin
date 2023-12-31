import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/src/components";

export default function EditUkuran({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Ukuran",
      name: "nama_ukuran",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Ukuran" />
      <FormEditData
        submitEndpoint={`/products/ukuran/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
