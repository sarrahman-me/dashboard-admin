import { DetailDataApi } from "@/src/template";

export default async function detailWarna({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/products/warna/${params.slug}`}
      title={"Warna"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_warna",
        },
      ]}
    />
  );
}
