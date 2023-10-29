"use client";
import {
  Button,
  IconButton,
  Select,
  Table,
  Typography,
} from "@/src/components";
import { GetDataApi } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";

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
  const [loading, setLoading] = useState(false);
  const [metadata, setMetada] = useState(
    {} as {
      page: number;
      limit: number;
      totalData: number;
      totalPages: number;
    }
  );
  const [data, setData] = useState([] as any);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${dataEndpoint}?limit=${currentLimit}&page=${currentPage}`
      );

      setData(response?.data || []);
      setCurrentPage(response?.metadata?.page || 1);
      setMetada(response?.metadata || {});

      setLoading(false);
    };

    fetchData();
  }, [currentLimit, currentPage, dataEndpoint]);

  const handleNextPage = () => {
    if (currentPage < metadata?.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      router.push(`${path}?page=${nextPage}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      router.push(`${path}?page=${prevPage}`);
    }
  };

  return (
    <div>
      {/* heading table */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Typography variant="subtitle">{title}</Typography>
          <Select
            noIcon
            size="small"
            value={currentLimit}
            setValue={(value) => {
              setCurrentLimit(value);
              setCurrentPage(1);
            }}
            lists={["10", "25", "50", "100"]}
          />
        </div>
        <Button onClick={() => router.push(`${path}/form`)} icon={<IoIosAdd />}>
          Tambah
        </Button>
      </div>

      {/* table */}
      <div className="my-2">
        <Table loading={loading} columns={columns} datas={data} />
      </div>

      {/* pagination */}
      <div className="flex justify-between items-center">
        <Typography color="secondary" variant="helper">
          {metadata.totalData > 0
            ? `${Math.min(
                (currentPage - 1) * metadata.limit + 1,
                metadata.totalData
              )} - ${Math.min(
                currentPage * metadata.limit,
                metadata.totalData
              )} dari ${metadata.totalData}`
            : "Tidak ada data yang tersedia"}
        </Typography>
        <div className="flex justify-around items-center space-x-5 md:space-x-10">
          <IconButton
            size="small"
            icon={<AiOutlineArrowLeft />}
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          />
          <IconButton
            size="small"
            icon={<AiOutlineArrowRight />}
            disabled={currentPage === metadata?.totalPages}
            onClick={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
