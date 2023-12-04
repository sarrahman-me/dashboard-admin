import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

export default function FormTagImage() {
  const form = [
    {
      type: "text",
      label: "Nama Tag gambar",
      name: "nama_tag_image",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Tambah Tag gambar" />
      <FormData submitEndpoint={"/products/tag-image"} formInput={form} />
    </div>
  );
}
