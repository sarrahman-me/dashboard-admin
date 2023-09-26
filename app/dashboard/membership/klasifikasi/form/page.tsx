import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function FormKlasifikasiMembership() {
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
      name: "kategori_harga",
      apiUrl: `${process.env.NEXT_PUBLIC_HOST}/membership/harga`,
      keyValue: ["slug", "nama_kategori_harga"],
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Klasifikasi membership" />
      <FormData submitEndpoint={"/membership/klasifikasi"} formInput={form} />
    </div>
  );
}
