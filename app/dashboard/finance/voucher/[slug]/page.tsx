import { DetailDataApi } from "@/layouts/template";

const DetailVoucher = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/finance/voucher/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama",
        },
      ]}
    />
  );
};

export default DetailVoucher;
