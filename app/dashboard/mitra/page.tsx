import { ReadDataTableApi } from "@/layouts/template";

export default async function Suplier() {
  return (
    <ReadDataTableApi
      title={"Mitra"}
      dataKey={["nama", "username"]}
      titleColumns={["Nama", "Username"]}
      dataEndpoint={"/mitra?page=1&limit=25"}
      notAddable={true}
    />
  );
}
