import { DetailDataApi } from "@/layouts/template";

export default async function detailTekstur({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/products/tekstur/${params.slug}`}
      title={"Tekstur"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_tekstur",
        },
      ]}
    />
  );
}
