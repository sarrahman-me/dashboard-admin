// import { Table } from "@/src/components/molecules";
import { GetDataApi, formatCurrency } from "@/src/utils";
import { FaCubes } from "react-icons/fa";

export default async function Dashboard() {
  const response = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/barang?page=1&limit=1`
  );

  const totalData = response?.metadata?.totalData;

  // const responseAnalysis = await GetDataApi(
  //   `${process.env.NEXT_PUBLIC_HOST}/analysis/barang`
  // );

  // // Konversi data harga dan stok menjadi array untuk digunakan dalam tabel
  // const hargaData = Object.entries(responseAnalysis.hargaAnalysis).map(
  //   ([key, value]: any) => ({
  //     name: key,
  //     hargaRataRata: formatCurrency(value.hargaRataRata),
  //     hargaTertinggi: formatCurrency(value.hargaTertinggi),
  //     hargaTerendah: formatCurrency(value.hargaTerendah),
  //   })
  // );

  // const stokData = Object.entries(responseAnalysis.stokAnalysis).map(
  //   ([key, value]: any) => ({
  //     name: key,
  //     totalStok: value.totalStok,
  //   })
  // );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-10 my-5">
        <div className="border rounded bg-gradient-to-r from-sky-900 to-sky-600 p-2 text-white shadow-lg ">
          <div className="flex justify-between">
            <div className="divide-y-8 divide-transparent">
              <p className="font-bold">Total Barang</p>
              <p className="font-semibold text-sm">{totalData}</p>
            </div>
            <div className="flex justify-center items-center border p-5 rounded-full bg-white text-sky-600">
              <FaCubes />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="my-5">
        <h2 className="font-bold">Tabel Analisis Harga Barang</h2>
        <Table
          notClickable={true}
          data={hargaData}
          titleColumns={[
            "Nama Barang",
            "Harga Rata-Rata",
            "Harga Tertinggi",
            "Harga Terendah",
          ]}
          dataKey={["name", "hargaRataRata", "hargaTertinggi", "hargaTerendah"]}
        />
      </div>

      <div className="my-5">
        <h2 className="font-bold">Tabel Analisis Stok Barang</h2>
        <Table
          notClickable={true}
          data={stokData}
          titleColumns={["Nama Barang", "Total Stok"]}
          dataKey={["name", "totalStok"]}
        />
      </div> */}
    </div>
  );
}
