import { ReadDataTableApi } from "@/src/template";

export default function Kualitas() {
  return (
    <ReadDataTableApi
      title={"Kualitas"}
      dataKey={["nama_kualitas"]}
      titleColumns={["Nama Kualitas"]}
      dataEndpoint={"/products/kualitas?page=1&limit=25"}
    />
  );
}
