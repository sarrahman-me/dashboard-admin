import { ReadDataTableApi } from "@/layouts/template";

export default function TipeTransaksi() {
  return (
    <ReadDataTableApi
      title={"Tipe Transaksi"}
      dataKey={["nama_tipe_transaksi"]}
      titleColumns={["Nama Tipe"]}
      dataEndpoint={"/finance/tipe?page=1&limit=25"}
    />
  );
}
