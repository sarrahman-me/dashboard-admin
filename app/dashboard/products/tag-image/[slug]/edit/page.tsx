import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/src/components";

export default function EditMotif({ params }: { params: { slug: string } }) {
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
      <HeaderAndBackIcon title="Edit Tag Image" />
      <FormEditData
        submitEndpoint={`/products/tag-image/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
