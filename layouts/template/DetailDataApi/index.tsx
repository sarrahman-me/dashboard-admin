"use client";
import {
  BackIcon,
  EditDataIcon,
  ListData,
  RemoveDataIcon,
} from "@/layouts/components/atoms";
import { useState, useEffect } from "react";
import { GetDataApi } from "@/utils";
import SectionLayout from "../sectionLayout";

const DetailDataApi = (props: {
  dataEndpoint: string;
  title: string;
  keyValueData: any[];
}) => {
  const [data, setData] = useState({} as any);

  useEffect(() => {
    const fetchBrand = async () => {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${props.dataEndpoint}`
      );
      setData(data.data);
    };

    fetchBrand();
  }, [props.dataEndpoint]);

  return (
    <div>
      <div className="flex items-center">
        <BackIcon />
        <h2 className="font-bold text-lg">Detail {props.title}</h2>
      </div>
      <SectionLayout>
        <div>
          {/* section list data */}
          {props.keyValueData.map((item: any, i) => (
            <div key={i}>
              <ListData label={item.key} value={data[item.value]} />
            </div>
          ))}
          {/* section action */}
          <div className="flex justify-end items-center">
            <EditDataIcon />
            <RemoveDataIcon url={props.dataEndpoint} />
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};

export default DetailDataApi;
