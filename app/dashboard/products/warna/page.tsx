import { ReadDataTableApi } from "@/layouts/template";

export default async function Warna() {
  return (
    <ReadDataTableApi
      title={"Warna"}
      dataKey={["nama_warna"]}
      titleColumns={["Nama Warna"]}
      dataEndpoint={"/products/warna"}
    />
  );
}
