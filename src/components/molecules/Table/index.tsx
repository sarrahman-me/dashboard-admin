import React from "react";
import { Typography } from "../../atoms";
import { PiFolderNotchOpen } from "react-icons/pi";

interface Column {
  label: string;
  renderCell: (item: any) => JSX.Element;
  align?: "center" | "left" | "right" | string;
}

interface TableProps {
  datas: any[];
  columns: Column[];
}

const Table = ({ datas, columns }: TableProps) => {
  // classname untuk mengatur perataan teks

  const alignClassName: Record<string, string> = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  };

  const tdClassNameDefault = `border-b text-xs sm:text-sm p-2 whitespace-nowrap`;

  if (datas.length < 1) {
    return (
      <div>
        <div className="flex justify-center m-1">
          <PiFolderNotchOpen className="text-lime-500 text-4xl md:text-5xl shadow shadow-lime-300 p-1 border rounded-full" />
        </div>
        <Typography color="secondary" variant="helper" align="center">
          No Data
        </Typography>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full table-auto">
        {/* heading table */}

        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                className="first-letter:uppercase bg-gray-200 dark:bg-gray-800 p-2 text-sm sm:text-base"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* body table */}

        <tbody>
          {datas.map((data, i) => (
            <tr key={i}>
              {columns.map((column, j) => (
                <td
                  key={j}
                  className={`${
                    alignClassName[column.align || "left"]
                  } ${tdClassNameDefault}`}
                >
                  {column.renderCell(data)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
