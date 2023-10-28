"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ReactElement } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface DropdownListProps {
  listMenu: { label: string; href: string }[];
  title: string;
  iconComponent: ReactElement;
  expand: boolean;
}

export default function DropdownList({
  listMenu,
  title,
  iconComponent,
  expand,
}: DropdownListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <li
        onClick={() => setOpen(!open)}
        className="flex w-full my-3 p-3 cursor-pointer rounded-md items-center hover:bg-lime-50 dark:hover:bg-gray-700"
      >
        {iconComponent}

        <div className={!expand ? "hidden" : "flex w-full items-center"}>
          <span className="flex-1 ml-3 font-medium">{title}</span>

          <span>
            <MdKeyboardArrowUp className={`${open ? "hidden" : ""}`} />
            <MdKeyboardArrowDown className={`${open ? "" : "hidden"}`} />
          </span>
        </div>
      </li>

      <div id="dropdown" className={`z-10 ${open ? "" : "hidden"}`}>
        <ul className="ml-3" aria-labelledby="dropdownDefaultButton">
          {listMenu.map((item: any, i: any) => {
            const currentPage =
              item.href !== "/dashboard"
                ? pathname === item.href || pathname.includes(item.href)
                : pathname === item.href;

            return (
              <li
                key={i}
                onClick={() => router.push(item.href)}
                className={`${
                  currentPage
                    ? "bg-lime-600 dark:bg-gray-700 text-white"
                    : "hover:bg-lime-50 dark:hover:bg-gray-700"
                } flex w-full my-2 p-2 cursor-pointer rounded-md `}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
