import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormData } from "@/src/components";

export default function FormVoucher() {
  const form = [
    {
      type: "text",
      label: "Nama Voucher",
      name: "name",
      autoFocus: true,
    },
    {
      type: "text",
      label: "Kategori",
      name: "category",
    },
    {
      type: "number",
      label: "Batas Penggunaan",
      name: "redemption_limit",
    },
    {
      type: "number",
      label: "Persentase Diskon",
      name: "discount_percentage",
    },
    {
      type: "date",
      label: "Tanggal Mulai",
      name: "start_date",
    },
    {
      type: "date",
      label: "Tanggal Berakhir",
      name: "exp_date",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Form Voucher" />
      <FormData submitEndpoint={"/finance/voucher"} formInput={form} />
    </div>
  );
}
