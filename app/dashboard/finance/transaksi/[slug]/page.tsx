import { DetailDataApi } from "@/layouts/template";

const DetailTransaksi = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/finance/transaksi/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Keterangan",
          value: "keterangan",
        },
        {
          key: "nominal",
          value: "nominal",
        },
      ]}
    />
  );
};

export default DetailTransaksi;
