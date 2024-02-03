import { FormData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function formDomainAllowed() {
  const form = [
    {
      type: "text",
      label: "Nama Domain",
      name: "domain",
      autoFocus: true,
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Domain Allowed" />
      <FormData submitEndpoint={"/config/domain"} formInput={form} />
    </div>
  );
}
