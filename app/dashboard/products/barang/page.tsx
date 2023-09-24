import { ReadDataTableApi } from "@/layouts/template";

export default async function Barang() {
  return (
    <ReadDataTableApi
      title={"Barang"}
      titleColumns={["Nama", "Brand", "Ukuran", "Warna", "Harga", "Stok"]}
      dataKey={["nama_barang", "brand", "ukuran", "warna", "harga", "stok"]}
      dataEndpoint={"/products/barang"}
    />
  );
}
