import { ReadDataTableApi } from "@/src/template";

export default async function Ukuran() {
  return (
    <ReadDataTableApi
      title={"Ukuran"}
      dataKey={["nama"]}
      titleColumns={["Nama Ukuran"]}
      dataEndpoint={"/ukuran-barang?page=1&limit=25"}
    />
  );
}
