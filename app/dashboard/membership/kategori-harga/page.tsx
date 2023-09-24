import { ReadDataTableApi } from "@/layouts/template";

export default function KategoriHarga() {
  return (
    <ReadDataTableApi
      title={"Kategori Harga"}
      dataKey={["nama_kategori_harga", "persentase"]}
      titleColumns={["Nama Kategori harga", "Persentase"]}
      dataEndpoint={"/membership/harga"}
    />
  );
}
