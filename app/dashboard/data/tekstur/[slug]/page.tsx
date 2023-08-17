import { DetailDataApi } from "@/src/template";

export default async function detailTekstur({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/tekstur-barang/${params.slug}`}
      title={"Tekstur"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama",
        },
      ]}
    />
  );
}
