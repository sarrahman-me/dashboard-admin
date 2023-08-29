import { ReadDataTableApi } from "@/layouts/template";

export default function Transaksi() {
  return (
    <ReadDataTableApi
      title={"Transaksi"}
      dataKey={["createdAt", "nominal"]}
      titleColumns={["Tanggal Transaksi", "Nominal"]}
      dataEndpoint={"/finance/transaksi?page=1&limit=25"}
    />
  );
}
