import {
  EditDataIcon,
  ListData,
  RemoveDataIcon,
} from "@/layouts/components/atoms";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout } from "@/layouts/template";
import { GetDataApi } from "@/utils";

export default async function detailWarna({
  params,
}: {
  params: { slug: string };
}) {
  const suplierResponse = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/suplier/pemasok/${params.slug}`
  );

  const brandResponse = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/suplier/brand/pemasok/${params.slug}`
  );

  const suplier = suplierResponse.data;
  const brand = brandResponse.data;

  return (
    <div>
      <HeaderAndBackIcon title="Detail suplier" />
      <div className="flex flex-col md:flex-row">
        <SectionLayout>
          <div>
            <ListData
              label={"Nama Perusahaan"}
              value={suplier.nama_perusahaan}
            />
            <ListData label={"Email"} value={suplier.email} />
            <ListData label={"Whatsapp"} value={suplier.whatsapp} />
            <ListData label={"Kota"} value={suplier.kota} />
            <div className="flex justify-end items-center">
              <EditDataIcon />
              <RemoveDataIcon url={`/suplier/pemasok/${params.slug}`} />
            </div>
          </div>
        </SectionLayout>
        <SectionLayout>
          <div className="divide-y-8 divide-transparent">
            <p className="underline">Daftar Brand</p>
            {brand.map((a: any, i: any) => (
              <div key={i}>
                <p>{a.nama_brand}</p>
              </div>
            ))}
          </div>
        </SectionLayout>
      </div>
    </div>
  );
}
