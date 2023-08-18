import { DetailDataApi } from "@/layouts/template";

export default async function detailWarna({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/suplier/pemasok/${params.slug}`}
      title={"Suplier"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_perusahaan",
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
