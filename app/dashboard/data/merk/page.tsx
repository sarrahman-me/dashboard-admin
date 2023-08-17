import { ReadDataTableApi } from "@/src/template";

export default function Merk() {
  return (
    <ReadDataTableApi
      title={"Merk"}
      dataKey={["nama"]}
      titleColumns={["Nama Merk"]}
      dataEndpoint={"/merk-barang?page=1&limit=25"}
    />
  );
}
