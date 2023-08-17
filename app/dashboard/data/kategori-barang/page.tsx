import { ReadDataTableApi } from "@/src/template";

export default async function KategoriBarang() {
  return (
    <ReadDataTableApi
      title={"Kategori Barang"}
      dataKey={["nama_kategori"]}
      titleColumns={["Nama Kategori Barang"]}
      dataEndpoint={"/products/kategori?page=1&limit=25"}
    />
  );
}
