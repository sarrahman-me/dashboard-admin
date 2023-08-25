import { DetailDataApi } from "@/layouts/template";

const DetailKlasifikasiMembership = ({
  params,
}: {
  params: { slug: string };
}) => {
  return (
    <DetailDataApi
      dataEndpoint={`/membership/klasifikasi/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_klasifikasi",
        },
        {
          key: "Harga",
          value: "harga",
        },
      ]}
    />
  );
};

export default DetailKlasifikasiMembership;
