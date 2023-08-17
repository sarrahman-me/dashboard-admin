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
          ? "bg-sky-200 hover:bg-sky-200 dark:text-sky-900 dark:bg-slate-800 dark:border"
          : "hover:bg-sky-100 dark:hover:text-sky-900"
      } flex hover:underline text-sky-900 items-center p-2 rounded-lg dark:text-slate-50`}
    >
      {iconComponent}
      <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
    </li>
  );
}
