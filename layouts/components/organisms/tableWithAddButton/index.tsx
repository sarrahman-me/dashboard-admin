"use client";
import { usePathname } from "next/navigation";
import { Button, Heading } from "../../atoms";
import { Table } from "../../molecules";

export default function TableWithAddButton(props: {
  data: any;
  title: string;
  dataKey: string[];
  titleColumns: string[];
}) {
  const data = props.data || [];
  const pathname = usePathname();
  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <Heading>{props.title}</Heading>
        <Button href={`${pathname}/form`}>Tambah</Button>
      </div>
      <Table
        dataKey={props.dataKey}
        data={data}
        titleColumns={props.titleColumns}
      />
    </div>
  );
}
