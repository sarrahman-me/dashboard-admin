"use client";
import { useState, useEffect } from "react";
import { TableWithAddButton } from "@/src/components/organisms";
import { GetDataApi } from "@/src/utils";

const ReadDataTableApi = (props: {
  dataEndpoint: string;
  title: string;
  dataKey: string[];
  titleColumns: string[];
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${props.dataEndpoint}`
      );
      setData(response?.data);
    };

    fetchData();
  }, [props.dataEndpoint]);

  return (
    <TableWithAddButton
      data={data}
      title={props.title}
      dataKey={props.dataKey}
      titleColumns={props.titleColumns}
    />
  );
};

export default ReadDataTableApi;
