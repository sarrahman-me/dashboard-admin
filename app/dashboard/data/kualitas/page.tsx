import { ReadDataTableApi } from "@/src/template";

export default function Kualitas() {
  return (
    <ReadDataTableApi
      title={"Kualitas"}
      dataKey={["nama"]}
      titleColumns={["Nama Kualitas"]}
      dataEndpoint={"/kualitas-barang?page=1&limit=25"}
    />
  );
}
