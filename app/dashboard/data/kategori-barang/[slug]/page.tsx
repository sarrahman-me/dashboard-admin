import { DetailDataApi } from "@/src/template";

export default async function detailKategoriBarang({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/kategori-barang/${params.slug}`}
      title={"Kategori Barang"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama",
        },
      ]}
    />
  );
}
