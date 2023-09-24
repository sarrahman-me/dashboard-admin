import { ReadDataTableApi } from "@/layouts/template";

export default function Brand() {
  return (
    <ReadDataTableApi
      title={"Brand"}
      dataKey={["nama_brand"]}
      titleColumns={["Nama Brand"]}
      dataEndpoint={"/suplier/brand"}
    />
  );
}
