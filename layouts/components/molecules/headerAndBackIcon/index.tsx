import { BackIcon } from "../../atoms";

export default function HeaderAndBackIcon(props: { title: string }) {
  return (
    <div className="my-2">
      <div className="flex items-center">
        <BackIcon />
        <h2 className="font-bold text-lg">{props.title}</h2>
      </div>
    </div>
  );
}
