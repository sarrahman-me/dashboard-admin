import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditKategoriHarga({
  params,
}: {
  params: { slug: string };
}) {
  const form = [
    {
      type: "text",
      label: "Nama Harga",
      name: "nama_kategori_harga",
      autoFocus: true,
    },
    {
      type: "number",
      label: "Persentase",
      name: "persentase",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Kategori harga" />
      <FormEditData
        submitEndpoint={`/membership/harga/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
