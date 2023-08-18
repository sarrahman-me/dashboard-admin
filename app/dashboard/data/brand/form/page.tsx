import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function FormBrand() {
  const form = [
    {
      type: "text",
      label: "Nama Brand",
      name: "nama_brand",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Brand" />
      <FormData submitEndpoint={"/suplier/brand"} formInput={form} />
    </div>
  );
}
