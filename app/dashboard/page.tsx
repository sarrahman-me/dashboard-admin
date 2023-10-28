"use client";
import { IconButton, Table } from "@/src/components";
import { CiEdit, CiTrash } from "react-icons/ci";

const data = [
  {
    nama: "Muhammad nur rahman",
    umur: 23,
  },
  {
    nama: "Sarah nur khalifah",
    umur: 24,
  },
  {
    nama: "Khaulah ma'rifatunnisa",
    umur: 4,
  },
  {
    nama: "Khalid fadlurrahman",
    umur: 2,
  },
  {
    nama: "khaulid",
    umur: 0,
  },
];

const columns = [
  {
    label: "Nama",
    renderCell: (item: any) => item.nama,
  },
  {
    label: "Umur",
    align: "right",
    renderCell: (item: any) => item.umur,
  },
  {
    label: "Edit",
    renderCell: (item: any) => (
      <div className="flex justify-center">
        <IconButton
          color="warning"
          onClick={() => console.log("oke")}
          icon={<CiEdit />}
        />
      </div>
    ),
  },
  {
    label: "Hapus",
    renderCell: (item: any) => (
      <div className="flex justify-center">
        <IconButton
          color="danger"
          onClick={() => console.log("oke")}
          icon={<CiTrash />}
        />
      </div>
    ),
  },
];

export default function Dashboard() {
  return (
    <div>
      <Table columns={columns} datas={data} />
    </div>
  );
}
