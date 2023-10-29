"use client";
import { DataTable, IconButton, Table } from "@/src/components";
import { formatCurrency } from "@/src/utils";
import moment from "moment";
import { CiEdit, CiTrash } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

export default function Dashboard() {
  const columns = [
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
    {
      label: "Edit",
      renderCell: async (item: any) => (
        <div className="flex justify-center">
          <IconButton
            size="small"
            color="warning"
            onClick={() => console.log("oke")}
            icon={<CiEdit />}
          />
        </div>
      ),
    },
    {
      label: "Hapus",
      renderCell: async (item: any) => (
        <div className="flex justify-center">
          <IconButton
            size="small"
            color="danger"
            onClick={() => console.log("oke")}
            icon={<CiTrash />}
          />
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
