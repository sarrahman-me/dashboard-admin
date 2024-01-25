"use client";
import { DataTable } from "@/src/components";
import { usePathname, useRouter } from "next/navigation";
import { PiArrowSquareUpRightLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

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
    {
      label: "Tampil Stok",
      renderCell: async (item: any) => (
        <div>
          {item.show_stock ? (
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
      label: "Tampil Harga",
      renderCell: async (item: any) => (
        <div>
          {item.show_price ? (
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
      label: "Dikunci",
      renderCell: async (item: any) => (
        <div>
          {item.use_password ? (
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
  ];

  return (
    <div>
      <DataTable title="Webstore" dataEndpoint="/webstore" columns={columns} />
    </div>
  );
}
