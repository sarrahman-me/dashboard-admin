import { DetailDataApi } from "@/layouts/template";

const DetailKategoriTransaksi = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/finance/kategori/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_kategori_transaksi",
        },
      ]}
    />
  );
};

export default DetailKategoriTransaksi;
