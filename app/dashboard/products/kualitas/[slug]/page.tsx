import { DetailDataApi } from "@/layouts/template";

const DetailKualitas = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/products/kualitas/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_kualitas",
        },
      ]}
    />
  );
};

export default DetailKualitas;
