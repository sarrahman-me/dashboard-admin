"use client";
import { useEffect, useState } from "react";
import { ListData } from "@/layouts/components/atoms";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout } from "@/layouts/template";
import { GetDataApi, formatCurrency } from "@/src/utils";
import moment from "moment";
import { Table } from "@/src/components";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { formatLastLogin } from "@/utils";

export default function DetailMitra({ params }: { params: { slug: string } }) {
  const [mitra, setMitra] = useState({} as any);
  const [membership, setMembership] = useState({} as any);
  const [klasifikasi, setKlasifikasi] = useState({} as any);
  const [transaksi, setTransaksi] = useState([] as any);

  useEffect(() => {
    async function fetchData() {
      const mitraResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/mitra/by?username=${params.slug}`
      );

      const transaksiResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/membership/${mitraResponse.data.id_membership}`
      );

      setTransaksi(transaksiResponse.data);
      setMitra(mitraResponse.data);

      if (mitraResponse.data.id_membership) {
        const membershipResponse = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/member/${mitraResponse.data.id_membership}`
        );

        setMembership(membershipResponse?.data.membership);
        setKlasifikasi(membershipResponse?.data.klasifikasi);
      }
    }
    fetchData();
  }, [params.slug]);

  return (
    <div>
      <HeaderAndBackIcon title="Detail suplier" />
      <SectionLayout>
        <div>
          <ListData label={"Nama"} value={mitra.nama} />
          <ListData label={"Email"} value={mitra.email} />
          <ListData label={"Whatsapp"} value={mitra.whatsapp} />
          <ListData label={"Kota"} value={mitra.kota} />
          <ListData
            label={"Terakhir masuk"}
            value={moment(mitra.lastLogin).format("lll")}
          />
        </div>
      </SectionLayout>
      {membership && (
        <div>
          <SectionLayout>
            <div>
              <p className="font-medium underline">Informasi Membership</p>
              <ListData label={"ID Membership"} value={mitra.id_membership} />
              <ListData
                label={"Paket Membership"}
                value={klasifikasi.nama_klasifikasi}
              />
              <ListData
                label={"Biaya Bulanan"}
                value={formatCurrency(Number(klasifikasi.harga))}
              />
              <ListData
                label={"Kategori Harga"}
                value={klasifikasi.kategori_harga}
              />
              <ListData
                label={"Berlangganan Sejak"}
                value={moment(Number(membership.startDate)).format("ll")}
              />
              <ListData
                label={"Berlangganan berakhir"}
                value={moment(Number(membership.endDate)).format("ll")}
              />
            </div>
          </SectionLayout>
          <p className="font-medium underline my-2">Informasi Transaksi</p>
          <Table
            columns={[
              {
                label: "Tanggal",
                renderCell: async (item: any) => (
                  <p>{formatLastLogin(item.createdAt)}</p>
                ),
              },
              {
                label: "Nominal",
                renderCell: async (item: any) => (
                  <p>{formatCurrency(Number(item.nominal))}</p>
                ),
              },
              {
                label: "verifikasi",
                renderCell: async (item: any) => (
                  <div>
                    {item.verifikasi ? (
                      <div className="flex justify-center">
                        <TiTick className="text-green-500" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <RxCross2 className="text-red-500" />
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
            datas={transaksi}
          />
        </div>
      )}
    </div>
  );
}
