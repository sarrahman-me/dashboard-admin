import { DetailDataApi } from "@/src/template";

export default async function detailMotif({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/motif-barang/${params.slug}`}
      title={"Motif"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama",
        },
      ]}
    />
  );
}
