import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/src/components";

export default function EditKategoriBarang({
  params,
}: {
  params: { slug: string };
}) {
  const form = [
    {
      type: "text",
      label: "Nama Kategori Barang",
      name: "nama_kategori",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Kategori Barang" />
      <FormEditData
        submitEndpoint={`/products/kategori/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
