import { ReadDataTableApi } from "@/layouts/template";

export default function KategoriHarga() {
  return (
    <ReadDataTableApi
      title={"Kategori Harga"}
      dataKey={["nama_kategori_harga"]}
      titleColumns={["Nama Kategori harga"]}
      dataEndpoint={"/membership/harga?page=1&limit=25"}
    />
  );
}
