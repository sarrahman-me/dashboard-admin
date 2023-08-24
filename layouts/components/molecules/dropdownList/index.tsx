"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ReactElement } from "react";
import { FaArrowCircleDown, FaArrowCircleUp, FaDatabase } from "react-icons/fa";

export default function DropdownList(props: {
  listMenu: any;
  title: string;
  iconComponent: ReactElement;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <li
        onClick={handleDropdownToggle}
        className="flex hover:underline hover:cursor-pointer items-center p-2 text-indigo-900 rounded-lg
        dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-700"
      >
       {props.iconComponent}
        <span className="flex-1 ml-3 whitespace-nowrap">{props.title}</span>
        <span>
          <FaArrowCircleUp className={`${isOpen ? "hidden" : ""}`} />
          <FaArrowCircleDown className={`${isOpen ? "" : "hidden"}`} />
        </span>
      </li>
      <div
        id="dropdown"
        className={`z-10 divide-y divide-indigo-100 rounded w-44 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <ul
          className="py-2 text-sm text-indigo-700 dark:text-indigo-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {props.listMenu.map((item: any, i: any) => {
            const currentPage =
              item.href !== "/dashboard"
                ? pathname === item.href || pathname.includes(item.href)
                : pathname === item.href;

            return (
              <li
                key={i}
                onClick={() => router.push(item.href)}
                className={`cursor-pointer rounded-lg hover:underline block px-4 text-indigo-900 dark:text-slate-50 py-2 ${
                  currentPage
                    ? "bg-indigo-200 hover:bg-indigo-200 dark:text-indigo-50 dark:bg-indigo-500 dark:border"
                    : "hover:bg-indigo-100 dark:hover:text-indigo-900"
                }`}
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
