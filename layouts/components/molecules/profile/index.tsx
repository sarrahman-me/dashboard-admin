"use client";
import { deleteCookie } from "cookies-next";
import { Confirm, Loading } from "notiflix";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { DeleteDataApi } from "@/utils";

const listMenu = [
  {
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    label: "Setting",
    href: "/dashboard/setting",
  },
];

export default function ProfileAppBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    Loading.circle();
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      async () => {
        try {
          const responseLogout = await DeleteDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/auth/user/logout`
          );
          if (responseLogout.success) {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            Loading.remove();
          }
        } catch (error) {
          console.error(error);
          Loading.remove();
        }
      },
      () => {
        Loading.remove();
        setIsOpen(false);
      }
    );
  };
  return (
    <div className="relative">
      <div
        onClick={handleDropdownToggle}
        className="flex justify-center rounded-xl text-indigo-950 dark:text-indigo-50 cursor-pointer hover:shadow-indigo-200  items-center p-1"
      >
        <FaUser className="w-5 h-5 mb-1 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 cursor-pointer" />
      </div>
      <div
        id="dropdown"
        className={`z-10 bg-white divide-y divide-indigo-100 rounded shadow w-44 absolute right-0 mt-2 text-sm text-indigo-700 dark:text-indigo-200 dark:bg-slate-800 ${
          isOpen ? "" : "hidden"
        }`}
      >
        {listMenu.map((item, i) => (
          <div
            onClick={() => router.push(item.href)}
            key={i}
            className="block px-4 cursor-pointer py-2 rounded-sm hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"
          >
            {item.label}
          </div>
        ))}
        <div
          onClick={handleLogout}
          className="block px-4 py-2 cursor-pointer rounded-sm hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"
        >
          Keluar
        </div>
      </div>
    </div>
  );
}
