import { ReadDataTableApi } from "@/layouts/template";

export default async function Suplier() {
  return (
    <ReadDataTableApi
      title={"Suplier"}
      dataKey={["nama_perusahaan"]}
      titleColumns={["Nama Perusahaan"]}
      dataEndpoint={"/suplier/pemasok?page=1&limit=25"}
    />
  );
}
