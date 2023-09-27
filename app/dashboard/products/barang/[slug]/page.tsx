/* eslint-disable @next/next/no-img-element */
import { SectionLayout } from "@/layouts/template";
import { GetDataApi, formatCurrency } from "@/utils";
import { HeaderAndBackIcon, IconSelect } from "@/layouts/components/molecules";
import { EditDataIcon, RemoveDataIcon } from "@/layouts/components/atoms";

const DetailProduct = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
  );

  const barang = responseBarang.data.currentData;

  return (
    <div>
      <HeaderAndBackIcon title="Detail Barang" />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 flex justify-center items-center w-full">
          <img src={barang.images[0]} alt={barang.slug} className="w-52 h-52 object-contain" />
        </div>
        <SectionLayout>
          <div className="divide-y-8 divide-transparent">
            <p className="text-sm md:text-base text-indigo-500">
              {barang.kategori}
            </p>
            <p className="md:text-lg font-semibold">
              {barang.nama_barang} - {barang.warna}
            </p>
            <p className="text-sm md:text-base">{barang.brand}</p>
            <p className="text-sm md:text-base">{barang.stok} dus</p>
            <p className="md:text-lg font-semibold">
              {formatCurrency(Number(barang.harga))}
            </p>
            <div className="flex mt-4">
              <EditDataIcon />
              <RemoveDataIcon url={`/products/barang/${slug}`} />
            </div>
          </div>
        </SectionLayout>
      </div>
      <SectionLayout>
        <div>
          <p className="underline font-semibold">Detail Produk</p>
          <div className="flex flex-col md:flex-row">
            <div className="divide-y-8 divide-transparent my-2 w-1/2">
              <p>Ukuran : {barang.ukuran}</p>
              <p>Kualitas : {barang.kualitas}</p>
              <p>Motif : {barang.motif}</p>
              <p>Tekstur : {barang.tekstur}</p>
              <p>Warna : {barang.warna}</p>
            </div>
            <div className="w-1/2">
              <div>
              <p className="underline">Penggunaan Umum</p>
                <div className="my-2">
                  <IconSelect
                    options={barang.penggunaan_umum}
                    selected={[]}
                    setSelected={null}
                    unSelected={true}
                  />
                </div>
              </div>
              <div>
                <p className="underline">Area Penggunaan</p>
                <div className="my-2">
                  <IconSelect
                    options={barang.area_penggunaan}
                    selected={[]}
                    setSelected={null}
                    unSelected={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};

export default DetailProduct;
