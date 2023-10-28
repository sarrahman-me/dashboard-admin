"use client";
import { IconButton, Table } from "@/src/components";
import { CiEdit, CiTrash } from "react-icons/ci";

const data = [
  {
    nama: "Muhammad nur rahman",
    umur: 23,
    daerah: "samarinda",
    gender: "pria",
  },
  {
    nama: "Sarah nur khalifah",
    umur: 24,
    daerah: "samarinda",
    gender: "wanita",
  },
  {
    nama: "Khaulah ma'rifatunnisa",
    umur: 4,
    daerah: "samarinda",
    gender: "wanita",
  },
  {
    nama: "Khalid fadlurrahman",
    umur: 2,
    daerah: "samarinda",
    gender: "pria",
  },
  {
    nama: "khaulid",
    umur: 0,
    daerah: "samarinda",
    gender: "pria",
  },
];

const columns = [
  {
    label: "Nama",
    renderCell: (item: any) => item.nama,
  },
  {
    label: "Umur",
    renderCell: (item: any) => item.umur,
  },
  {
    label: "Daerah",
    renderCell: (item: any) => item.daerah,
  },
  {
    label: "Gender",
    renderCell: (item: any) => item.gender,
  },
  {
    label: "Edit",
    renderCell: (item: any) => (
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
    renderCell: (item: any) => (
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

export default function Dashboard() {
  return (
    <div>
      <Table columns={columns} datas={data} />
      <br />
      <br />
      <Table columns={columns} datas={[]} />
    </div>
  );
}
