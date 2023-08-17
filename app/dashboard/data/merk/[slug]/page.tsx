import { DetailDataApi } from "@/src/template";

const DetailBrand = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/merk-barang/${params.slug}`}
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

export default DetailBrand;
