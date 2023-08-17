import { ReadDataTableApi } from "@/src/template";

export default async function Tekstur() {
  return (
    <ReadDataTableApi
      title={"Tekstur"}
      dataKey={["nama"]}
      titleColumns={["Nama Tekstur"]}
      dataEndpoint={"/tekstur-barang?page=1&limit=25"}
    />
  );
}
