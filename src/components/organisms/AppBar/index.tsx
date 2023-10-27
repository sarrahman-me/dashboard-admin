"use client";
import { useEffect } from "react";
import { Logo, ResizeLayarButton, ToggleDarkMode } from "../../atoms";
import { TopBar } from "../../molecules";
import { GetDataApi } from "@/src/utils";
import { Report } from "notiflix";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setMembership,
  setPersentaseHarga,
  setProfile,
  setTransaksi,
  setWebstore,
} from "@/src/redux/slice/profile";

/**
 * Komponen AppBar digunakan untuk membuat bilah aplikasi yang dapat menampilkan judul dan opsi lainnya.
 *
 */

export default function AppBar() {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const responseProfile = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`,
        300
      );

      if (responseProfile.status !== 200) {
        Report.warning(
          "Sesi anda berakhir",
          "Silahkan lakukan login ulang untuk tetap mengakses dashboard",
          "Okay",
          () => {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            window.location.reload();
          }
        );
      }

      const profile = responseProfile?.data;
      let membership = null;
      let transaksi = null;
      let persentaseHarga = null;
      let webstore = null;

      if (profile?.id_membership) {
        const responseMembership = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/member/${profile?.id_membership}`,
          300
        );
        membership = responseMembership?.data.membership;
        persentaseHarga = responseMembership?.data?.harga?.persentase;
      }

      if (profile?.id_webstore) {
        const responseWebstore = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`
        );
        webstore = responseWebstore?.data;
      }

      if (membership?.id_transaksi) {
        const responseTransaksi = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${membership.id_transaksi}`,
          300
        );

        transaksi = responseTransaksi?.data;
      }
      dispatch(setWebstore(webstore));
      dispatch(setTransaksi(transaksi));
      dispatch(setPersentaseHarga(persentaseHarga));
      dispatch(setMembership(membership));
      dispatch(setProfile(profile));
    }
    fetchData();
  }, [dispatch, router]);

  return (
    <div className="sticky top-0 z-50 bg-gray-100  dark:bg-gray-900">
      <div className="p-2 px-4 md:p-4 divide-x-8 divide-transparent md:px-8 flex justify-between sm:justify-end items-center">
        <div className="sm:hidden">
          <Logo />
        </div>
        <div className="flex space-x-2 md:space-x-4 items-center">
          <ResizeLayarButton />
          <ToggleDarkMode />
          <p className="text-sm hidden sm:flex rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-sm">
            {profile?.email}
          </p>
        </div>
      </div>
      <TopBar />
    </div>
  );
}
