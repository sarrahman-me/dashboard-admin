import { DetailDataApi } from "@/src/template";

const DetailKualitas = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/kualitas-barang/${params.slug}`}
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

export default DetailKualitas;
