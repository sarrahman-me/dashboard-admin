import { DetailDataApi } from "@/layouts/template";

export default async function detailMitra({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/mitra/${params.slug}`}
      title={"Mitra"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama",
        },
        {
          key: "Email",
          value: "email",
        },
        {
          key: "Whatsapp",
          value: "no_whatsapp",
        },
        {
          key: "Kota",
          value: "kota",
        },
      ]}
    />
  );
}
