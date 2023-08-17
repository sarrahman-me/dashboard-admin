import { DetailDataApi } from "@/src/template";

export default async function detailUkuran({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/ukuran-barang/${params.slug}`}
      title={"Ukuran"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama",
        },
      ]}
    />
  );
}
