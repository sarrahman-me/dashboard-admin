"use client";
import { useState, useEffect } from "react";
import { GetDataApi } from "@/utils";
import { Button, Heading } from "@/layouts/components/atoms";
import { Table } from "@/layouts/components/molecules";
import { usePathname } from "next/navigation";

const ReadDataTableApi = (props: {
  dataEndpoint: string;
  title: string;
  dataKey: string[];
  titleColumns: string[];
  notAddable?: boolean;
}) => {
  const pathname = usePathname();
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${props.dataEndpoint}`
      );
      setData(response?.data || []);
    };

    fetchData();
  }, [props.dataEndpoint]);

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <Heading>{props.title}</Heading>
        {!props.notAddable && <Button href={`${pathname}/form`}>Tambah</Button>}
      </div>
      <Table
        dataKey={props.dataKey}
        data={data}
        titleColumns={props.titleColumns}
      />
    </div>
  );
};

export default ReadDataTableApi;
