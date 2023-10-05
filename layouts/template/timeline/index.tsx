"use client";
import { Button } from "@/layouts/components/atoms";
import { PatchDataApi, stringToSlug } from "@/utils";
import { Confirm, Loading, Notify } from "notiflix";

export default function Timeline(props: {
  nama_webstore: string;
  id_webstore: string;
}) {
  const verifikasiSitus = () => {
    Confirm.show(
      "Konfirmasi",
      "Apakah semua proses berjalan dengan baik?",
      "Ya",
      "Tidak",
      async () => {
        const response = await PatchDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/webstore/${props.id_webstore}`,
          {
            url: `https://${stringToSlug(props.nama_webstore)}.netlify.app`,
            domain: `${stringToSlug(props.nama_webstore)}.netlify.app`,
            isLive: true,
          }
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
    <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 my-2 w-full shadow m-1">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Langkah 1
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Kunjungi Situs Netlify, klik tombol dibawah
          </p>
          <Button href="https://app.netlify.com/start">Netlify</Button>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Langkah 2
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Deploy dengan github sarrahman-me/webstore-mitra dengan konfigurasi
            berikut
          </p>
          <ul className="my-2 bg-slate-100 dark:bg-slate-900 rounded-md">
            <li>Branch : main</li>
            <li>Build command: npm run build</li>
            <li>Publish directory: .next</li>
          </ul>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Setelah selesai klik Deploy
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Langkah 3
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Merubah nama situs, buka halaman situs yang tadi di deploy kemudian
            klik site configuration dan klik [Change Site Name] dan masukkan ini
          </p>
          <div className="my-2 bg-slate-100 dark:bg-slate-900 rounded-md">
            {props.nama_webstore ? (
              <p>{stringToSlug(props.nama_webstore)}</p>
            ) : (
              <p>sesuaikan dengan nama webstore</p>
            )}
          </div>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Langkah 4
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Menambahkan environment variable pada situs webstore, tambahkan key
            value sebagai berikut
          </p>
          <ul className="my-2 bg-slate-100 dark:bg-slate-900 rounded-md">
            <li>NEXT_PUBLIC_HOST=https://api.tokokeramik.com</li>
            {props.nama_webstore ? (
              <li>
                NEXT_PUBLIC_DOMAIN=
                {`https://${stringToSlug(props.nama_webstore)}.netlify.app`}
              </li>
            ) : (
              <div>
                <li>NEXT_PUBLIC_DOMAIN=https://[nama_webstore].netlify.app</li>
                <p className="text-xs">
                  Ganti [nama_webstore] sesuai dengan nama webstore
                </p>
              </div>
            )}
          </ul>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Langkah 5
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Kunjungi webstore dan lakukan pengujian dengan mengklik tombol
            dibawah ini, pastikan webstore berjalan dan berfungsi dengan baik
          </p>
          {props.nama_webstore && (
            <Button
              href={`https://${stringToSlug(props.nama_webstore)}.netlify.app`}
            >
              Webstore
            </Button>
          )}
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Langkah 6
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Lakukan verifikasi untuk menyelesaikan proses Deployment
          </p>
          {props.nama_webstore && (
            <Button onClick={verifikasiSitus}>Verifikasi</Button>
          )}
        </li>
      </ol>
    </div>
  );
}
