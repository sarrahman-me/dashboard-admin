import { DetailDataApi } from "@/layouts/template";

const DetailBrand = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/suplier/brand/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_brand",
        },
      ]}
    />
  );
};

export default DetailBrand;
