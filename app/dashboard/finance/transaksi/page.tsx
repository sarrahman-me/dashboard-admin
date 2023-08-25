import { ReadDataTableApi } from "@/layouts/template";

export default function Transaksi() {
  return (
    <ReadDataTableApi
      title={"Transaksi"}
      dataKey={["keterangan", "nominal"]}
      titleColumns={["Keterangan Transaksi", "Nominal"]}
      dataEndpoint={"/finance/transaksi?page=1&limit=25"}
    />
  );
}
