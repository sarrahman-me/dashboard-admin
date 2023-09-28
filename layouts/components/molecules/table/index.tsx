"use client";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  data: any[];
  titleColumns: string[];
  dataKey: any;
  notClickable?: boolean;
  metadata: any;
};

const Table = ({
  data,
  titleColumns,
  dataKey,
  notClickable,
  metadata,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const startNumber = (metadata.page - 1) * metadata.limit + 1;

  return (
    <div className="relative overflow-x-auto p-1">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-slate-800 dark:text-slate-50 rounded-t-md">
          <tr>
            <th>Nomor</th>
            {titleColumns.map((title: string, index: number) => (
              <th key={index} scope="col" className="px-6 py-3">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody>
            {data.map((item: any, index: number) => (
              <tr
                id={item.id}
                onClick={
                  notClickable
                    ? () => {}
                    : () => router.push(`${pathname}/${item.slug}`)
                }
                key={index}
                className={`${
                  notClickable
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-400"
                } bg-white border-b dark:bg-slate-500 dark:border-slate-50`}
              >
                <td className="px-6 py-4">
                  {startNumber + index || index + 1}
                </td>
                {dataKey.map((key: string, index: number) => (
                  <td key={index} className="px-6 py-4">
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={titleColumns.length + 1}
                className="px-6 py-4 text-center text-indigo-500 dark:text-indigo-400"
              >
                Tidak ada data
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
