import { ReadDataTableApi } from "@/src/template";

export default async function KategoriBarang() {
  return (
    <ReadDataTableApi
      title={"Kategori Barang"}
      dataKey={["nama"]}
      titleColumns={["Nama Kategori Barang"]}
      dataEndpoint={"/kategori-barang?page=1&limit=25"}
    />
  );
}
