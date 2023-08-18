import { DetailDataApi } from "@/layouts/template";

export default async function detailMotif({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/products/motif/${params.slug}`}
      title={"Motif"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_motif",
        },
      ]}
    />
  );
}
