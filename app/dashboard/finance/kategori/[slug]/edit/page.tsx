import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditKategoriTransaksi({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Kategori Transaksi",
      name: "nama_kategori_transaksi",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Kategori transaksi" />
      <FormEditData
        submitEndpoint={`/finance/kategori/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
