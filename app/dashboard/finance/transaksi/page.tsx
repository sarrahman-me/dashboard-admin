"use client";
import { DataTable } from "@/src/components";
import { formatCurrency } from "@/src/utils";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import { PiArrowSquareUpRightLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

export default function Transaksi() {
  const pathname = usePathname();
  const router = useRouter();

  const columns = [
    {
      label: "Id Transaksi",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.id_transaksi}
          <PiArrowSquareUpRightLight className="ml-1" />
        </p>
      ),
    },
    {
      label: "Tanggal",
      renderCell: async (item: any) => (
        <p>{moment(item.createdAt).format("lll")}</p>
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
  ];

  return (
    <div>
      <DataTable
        title="Transaksi"
        dataEndpoint="/finance/transaksi"
        columns={columns}
      />
    </div>
  );
}
