import { ReadDataTableApi } from "@/src/template";

export default function Brand() {
  return (
    <ReadDataTableApi
      title={"Brand"}
      dataKey={["nama_brand"]}
      titleColumns={["Nama Brand"]}
      dataEndpoint={"/suplier/brand?page=1&limit=25"}
    />
  );
}
