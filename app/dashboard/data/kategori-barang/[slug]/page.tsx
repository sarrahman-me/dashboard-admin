import { DetailDataApi } from "@/layouts/template";

export default async function detailKategoriBarang({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/products/kategori/${params.slug}`}
      title={"Kategori Barang"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_kategori",
        },
      ]}
    />
  );
}
