import { ReadDataTableApi } from "@/layouts/template";

export default function Suplier() {
  return (
    <ReadDataTableApi
      title={"Suplier"}
      dataKey={["nama_perusahaan"]}
      titleColumns={["Nama Perusahaan"]}
      dataEndpoint={"/suplier/pemasok"}
    />
  );
}
