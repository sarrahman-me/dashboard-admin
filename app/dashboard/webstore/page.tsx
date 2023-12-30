"use client";
import { DataTable } from "@/src/components";
import { usePathname, useRouter } from "next/navigation";
import { PiArrowSquareUpRightLight } from "react-icons/pi";

export default function Webstore() {
  const router = useRouter();
  const pathname = usePathname();

  const columns = [
    {
      label: "Nama",
      renderCell: async (item: any) => (
        <p
          className="underline cursor-pointer text-blue-500 flex items-center"
          onClick={() => router.push(`${pathname}/${item.slug}`)}
        >
          {item.nama_webstore}
          <PiArrowSquareUpRightLight className="ml-1" />
        </p>
      ),
    },
    {
      label: "Domain",
      renderCell: async (item: any) => item.domain,
    },
  ];

  return (
    <div>
      <DataTable
        title="Webstore"
        dataEndpoint="/webstore"
        columns={columns}
      />
    </div>
  );
}
