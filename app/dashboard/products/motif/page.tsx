import { ReadDataTableApi } from "@/layouts/template";

export default async function Motif() {
  return (
    <ReadDataTableApi
      title={"Motif"}
      dataKey={["nama_motif"]}
      titleColumns={["Nama Motif"]}
      dataEndpoint={"/products/motif"}
    />
  );
}
