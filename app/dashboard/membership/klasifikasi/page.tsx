import { ReadDataTableApi } from "@/layouts/template";

export default function klasifikasiMembership() {
  return (
    <ReadDataTableApi
      title={"Klasifikasi Membership"}
      dataKey={["nama_klasifikasi"]}
      titleColumns={["Nama Klasifikasi"]}
      dataEndpoint={"/membership/klasifikasi?page=1&limit=25"}
    />
  );
}
