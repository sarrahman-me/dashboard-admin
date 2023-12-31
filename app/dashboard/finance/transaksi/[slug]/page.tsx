"use client";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout } from "@/layouts/template";
import { Button, ListData } from "@/src/components";
import { GetDataApi, PatchDataApi } from "@/utils";
import { Confirm, Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";

export default function DetailTransaksi({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const [transaksi, setTransaksi] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const responseTransaksi = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${slug}`
      );
      setTransaksi(responseTransaksi.data);
    }

    fetchData();
  }, [slug]);

  const handleVerifikasi = async () => {
    Loading.hourglass();
    Confirm.show(
      "Konfirmasi",
      "Yakin Ingin Memverifikasi Transaksi?",
      "Yakin",
      "Tidak",
      async () => {
        const response = await PatchDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${slug}`,
          { verifikasi: true, tanggal_verifikasi: new Date() }
        );
        if (response.success) {
          Loading.remove();
          Notify.success("berhasil verifikasi");
          window.location.reload();
        } else {
          Loading.remove();
          Notify.success(response.message || "gagal verifikasi");
        }
      },
      () => {}
    );
  };

  return (
    <div>
      <HeaderAndBackIcon title={"Detail Transaksi"} />
      <SectionLayout>
        <div>
          <ListData label="ID Transaksi" value={transaksi.id_transaksi} />
          <ListData label="Keterangan" value={transaksi.keterangan} />
          <ListData label="Tanggal" value={transaksi.nominal} />
          <ListData label="Nominal" value={transaksi.createdAt} />
          <ListData
            label="Status"
            value={transaksi.verifikasi ? "Verified" : "not Verified"}
          />
        </div>
      </SectionLayout>
      {transaksi.verifikasi ? null : (
        <div onClick={handleVerifikasi}>
          <Button>Verifikasi</Button>
        </div>
      )}
    </div>
  );
}
