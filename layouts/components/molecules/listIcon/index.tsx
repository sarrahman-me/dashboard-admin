"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactElement } from "react";

interface Props {
  text: string;
  iconComponent: ReactElement;
  href: string | "/";
}

export default function ListIcon({ text, iconComponent, href }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const currentPage =
    href !== "/dashboard"
      ? pathname === href || pathname.includes(href)
      : pathname === href;
  return (
    <li
      onClick={() => router.push(href)}
      className={`cursor-pointer ${
        currentPage
          ? "bg-white dark:text-indigo-50 dark:bg-slate-800 border"
          : ""
      } flex text-indigo-900 items-center p-2 rounded-lg dark:text-slate-50`}
    >
      <div
        className={`${
          currentPage ? "text-white bg-indigo-500" : "text-indigo-500 bg-white dark:bg-slate-800"
        } p-2 rounded-xl`}
      >
        {iconComponent}
      </div>
      <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
    </li>
  );
}
