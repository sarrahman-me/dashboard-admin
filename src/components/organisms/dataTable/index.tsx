"use client";
import { IconButton, Select, Table, Typography } from "@/src/components";
import { GetDataApi } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Column {
  label: string;
  renderCell: (item: any) => any;
  align?: "center" | "left" | "right" | string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  dataEndpoint: string;
}

const DataTable = ({ columns, dataEndpoint, title }: DataTableProps) => {
  const router = useRouter();
  const path = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState("25");
  const [metadata, setMetada] = useState({} as any);
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${dataEndpoint}?limit=${currentLimit}&page=${currentPage}`
      );

      console.log(response);
      setData(response?.data || []);
      // setCurrentPage(response?.metadata?.page || 1);
      // setMetada(response?.metadata || {});
    };

    fetchData();
  }, [currentLimit, currentPage, dataEndpoint]);

  return (
    <div>
      {/* heading table */}
      <div className="flex space-x-2">
        <Typography variant="subtitle">{title}</Typography>
        <Select
          noIcon
          size="small"
          value={currentLimit}
          setValue={setCurrentLimit}
          lists={["10", "25", "50", "100"]}
        />
      </div>

      {/* table */}
      <div className="my-2">
        <Table columns={columns} datas={data} />
      </div>

      {/* pagination */}
      <div>
        <Typography variant="helper" color="secondary">
          1 - 2 dari 2 data
        </Typography>
      </div>
    </div>
  );
};

export default DataTable;
