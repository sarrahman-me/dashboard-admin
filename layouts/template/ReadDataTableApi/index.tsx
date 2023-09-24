"use client";
import { useState, useEffect } from "react";
import { GetDataApi } from "@/utils";
import { Button, Heading } from "@/layouts/components/atoms";
import { Table } from "@/layouts/components/molecules";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ReadDataTableApi = (props: {
  dataEndpoint: string;
  title: string;
  dataKey: string[];
  titleColumns: string[];
  notAddable?: boolean;
}) => {
  const path = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page");
  const pathname = usePathname();
  const [data, setData] = useState([] as any);
  const [metadata, setMetada] = useState({} as any);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${props.dataEndpoint}?limit=25&page=${currentPage}`
      );
      setData(response?.data || []);
      setCurrentPage(response?.metadata?.page || 1);
      setMetada(response?.metadata || {});
    };

    fetchData();
  }, [currentPage, props.dataEndpoint]);

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
      <div className="mb-2 flex justify-between items-center">
        <Heading>{props.title}</Heading>
        {!props.notAddable && <Button href={`${pathname}/form`}>Tambah</Button>}
      </div>
      <Table
        metadata={metadata}
        dataKey={props.dataKey}
        data={data}
        titleColumns={props.titleColumns}
      />
      <div className="flex justify-between items-center p-2">
        <div>
          <p className="text-xs md:text-sm text-gray-500">
            {metadata.totalData > 0
              ? `${Math.min(
                  (currentPage - 1) * metadata.limit + 1,
                  metadata.totalData
                )} - ${Math.min(
                  currentPage * metadata.limit,
                  metadata.totalData
                )} dari ${metadata.totalData}`
              : "Tidak ada data yang tersedia"}
          </p>
        </div>
        <div className="flex justify-around items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-4xl text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed mr-5"
          >
            {"<"}
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === metadata?.totalPages}
            className="text-4xl text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadDataTableApi;
