import { ReadDataTableApi } from "@/layouts/template";

export default async function Barang() {
  return (
    <ReadDataTableApi
      title={"Barang"}
      dataKey={["nama_barang", "harga", "stok"]}
      titleColumns={["Nama", "Harga", "Stok"]}
      dataEndpoint={"/products/barang?page=1&limit=25"}
    />
  );
}
