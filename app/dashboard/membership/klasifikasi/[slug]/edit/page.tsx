import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditKlasifikasiMembership({
  params,
}: {
  params: { slug: string };
}) {
  const form = [
    {
      type: "text",
      label: "Nama Klasifikasi",
      name: "nama_klasifikasi",
      autoFocus: true,
    },
    {
      type: "number",
      label: "Harga",
      name: "harga",
    },
    {
      type: "text",
      label: "Deskripsi",
      name: "deskripsi",
    },
    {
      type: "select-api",
      label: "Kategori harga",
      name: "id_kategori_harga",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/membership/harga`,
      keyValue: ["id", "nama_kategori_harga"],
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit klasifikasi membership" />
      <FormEditData
        submitEndpoint={`/membership/klasifikasi/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
