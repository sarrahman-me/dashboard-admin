"use client";
import { DataTable } from "@/src/components";
import { formatLastLogin } from "@/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { PiArrowSquareUpRightLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

export default function Mitra() {
  const pathname = usePathname();
  const router = useRouter();

  const columns = [
    {
      label: "Nama",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.nama}
          <PiArrowSquareUpRightLight className="ml-1" />
        </p>
      ),
    },
    {
      label: "Email",
      renderCell: async (item: any) => item.email,
    },
    {
      label: "Whatsapp",
      renderCell: async (item: any) => item.whatsapp,
    },
    {
      label: "Kota",
      renderCell: async (item: any) => item.kota,
    },
    {
      label: "membership",
      renderCell: async (item: any) => (
        <div>
          {item.id_membership ? (
            <div className="flex justify-center">
              <TiTick className="text-green-500 text-lg" />
            </div>
          ) : (
            <div className="flex justify-center">
              <RxCross2 className="text-lg" />
            </div>
          )}
        </div>
      ),
    },
    {
      label: "webstore",
      renderCell: async (item: any) => (
        <div>
          {item.id_webstore ? (
            <div className="flex justify-center">
              <TiTick className="text-green-500 text-lg" />
            </div>
          ) : (
            <div className="flex justify-center">
              <RxCross2 className="text-lg" />
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Terakhir masuk",
      renderCell: async (item: any) => (
        <p>
          {item.lastLogin
            ? formatLastLogin(item.lastLogin)
            : "tidak pernah masuk"}
        </p>
      ),
    },
  ];

  return (
    <div>
      <DataTable title="Mitra" dataEndpoint="/mitra" columns={columns} />
    </div>
  );
}
