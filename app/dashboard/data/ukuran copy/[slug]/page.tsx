import react from "react";
import { DetailDataApi } from "@/src/template";

export default async function detailUkuran({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <DetailDataApi
      dataEndpoint={`/products/ukuran/${params.slug}`}
      title={"Ukuran"}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_ukuran",
        },
      ]}
    />
  );
}
