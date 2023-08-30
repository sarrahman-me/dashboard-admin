import { ReactElement } from "react";

export default function SectionLayout(props: { children: ReactElement }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 my-2 w-full shadow">
      {props.children}
    </div>
  );
}
