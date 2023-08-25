import { DetailDataApi } from "@/layouts/template";

const DetailKategoriHarga = ({ params }: { params: { slug: string } }) => {
  return (
    <DetailDataApi
      dataEndpoint={`/membership/harga/${params.slug}`}
      title={params.slug}
      keyValueData={[
        {
          key: "Nama",
          value: "nama_kategori_harga",
        },
      ]}
    />
  );
};

export default DetailKategoriHarga;
