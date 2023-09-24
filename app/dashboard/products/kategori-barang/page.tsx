import { ReadDataTableApi } from "@/layouts/template";

export default async function KategoriBarang() {
  return (
    <ReadDataTableApi
      title={"Kategori Barang"}
      dataKey={["nama_kategori"]}
      titleColumns={["Nama Kategori Barang"]}
      dataEndpoint={"/products/kategori"}
    />
  );
}
