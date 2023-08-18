import { ReadDataTableApi } from "@/layouts/template";

export default async function Ukuran() {
  return (
    <ReadDataTableApi
      title={"Ukuran"}
      dataKey={["nama_ukuran"]}
      titleColumns={["Nama Ukuran"]}
      dataEndpoint={"/products/ukuran?page=1&limit=25"}
    />
  );
}
