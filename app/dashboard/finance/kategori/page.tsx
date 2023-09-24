import { ReadDataTableApi } from "@/layouts/template";

export default function KateogriTransaksi() {
  return (
    <ReadDataTableApi
      title={"Kategori Transaksi"}
      dataKey={["nama_kategori_transaksi"]}
      titleColumns={["Nama Kategori"]}
      dataEndpoint={"/finance/kategori"}
    />
  );
}
