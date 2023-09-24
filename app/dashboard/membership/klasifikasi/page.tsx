import { ReadDataTableApi } from "@/layouts/template";

export default function klasifikasiMembership() {
  return (
    <ReadDataTableApi
      title={"Klasifikasi Membership"}
      dataKey={["nama_klasifikasi", "harga"]}
      titleColumns={["Nama Klasifikasi", "Harga"]}
      dataEndpoint={"/membership/klasifikasi"}
    />
  );
}
