import { ReadDataTableApi } from "@/src/template";

export default async function Motif() {
  return (
    <ReadDataTableApi
      title={"Motif"}
      dataKey={["nama"]}
      titleColumns={["Nama Motif"]}
      dataEndpoint={"/motif-barang?page=1&limit=25"}
    />
  );
}
