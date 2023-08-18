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
          ? "bg-amber-200 hover:bg-amber-200 dark:text-amber-50 dark:bg-amber-500 dark:border"
          : "hover:bg-amber-100 dark:hover:text-amber-900"
      } flex hover:underline text-amber-900 items-center p-2 rounded-lg dark:text-slate-50`}
    >
      {iconComponent}
      <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>
    </li>
  );
}
