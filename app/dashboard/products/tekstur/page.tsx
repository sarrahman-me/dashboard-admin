import { ReadDataTableApi } from "@/layouts/template";

export default async function Tekstur() {
  return (
    <ReadDataTableApi
      title={"Tekstur"}
      dataKey={["nama_tekstur"]}
      titleColumns={["Nama Tekstur"]}
      dataEndpoint={"/products/tekstur?page=1&limit=25"}
    />
  );
}
