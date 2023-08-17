import { ReadDataTableApi } from "@/src/template";

export default async function Warna() {
  return (
    <ReadDataTableApi
      title={"Warna"}
      dataKey={["nama_warna"]}
      titleColumns={["Nama Warna"]}
      dataEndpoint={"/products/warna?page=1&limit=25"}
    />
  );
}
