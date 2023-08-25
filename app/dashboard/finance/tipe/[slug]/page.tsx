import { DetailDataApi } from "@/layouts/template";

const DetailTipe = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/finance/tipe/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_tipe_transaksi",
        },
      ]}
    />
  );
};

export default DetailTipe;
