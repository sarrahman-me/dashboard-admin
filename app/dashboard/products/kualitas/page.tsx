import { ReadDataTableApi } from "@/layouts/template";

export default function Kualitas() {
  return (
    <ReadDataTableApi
      title={"Kualitas"}
      dataKey={["nama_kualitas"]}
      titleColumns={["Nama Kualitas"]}
      dataEndpoint={"/products/kualitas"}
    />
  );
}
