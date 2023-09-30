import { ReadDataTableApi } from "@/layouts/template";

export default function Webstore() {
  return (
    <ReadDataTableApi
      title={"Webstore"}
      dataKey={["nama_webstore", "domain"]}
      titleColumns={["Nama", "Domain"]}
      dataEndpoint={"/webstore"}
    />
  );
}
