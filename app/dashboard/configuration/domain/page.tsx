import { ReadDataTableApi } from "@/layouts/template";

export default function DomainAllowed() {
  return (
    <ReadDataTableApi
      notAddable={true}
      title={"Domain Allowed"}
      dataKey={["domain"]}
      titleColumns={["Nama Domain"]}
      dataEndpoint={"/config/domain"}
    />
  );
}
