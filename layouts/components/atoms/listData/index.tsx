import { FaDotCircle } from "react-icons/fa";

export default function ListData(props: { label: string; value: any }) {
  return (
    <div className="my-3 flex items-center">
      <div className="mr-2">
        <FaDotCircle className="text-slate-400" size="8px" />
      </div>
      <div>
        <p className="text-gray-400 font-bold">{props.label}</p>
        <p className="font-semibold text-gray-700 dark:text-slate-50">{props.value || "-"}</p>
      </div>
    </div>
  );
}
