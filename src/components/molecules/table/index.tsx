"use client";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  data: any[];
  titleColumns: string[];
  dataKey: any;
  notClickable?: boolean;
};

const Table = ({ data, titleColumns, dataKey, notClickable }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative overflow-x-auto p-1 shadow rounded">
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-900 dark:text-slate-400">
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
                onClick={
                  notClickable
                    ? () => {}
                    : () => router.push(`${pathname}/${item.slug}`)
                }
                key={index}
                className={`${
                  notClickable
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                } bg-white border-b dark:bg-slate-800 dark:border-slate-700`}
              >
                <td className="px-6 py-4">{index + 1}</td>
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
                className="px-6 py-4 text-center text-slate-500 dark:text-slate-400"
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
