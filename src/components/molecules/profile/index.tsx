"use client";
import { Confirm, Loading } from "notiflix";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

export default function ProfileAppBar(props: { user: any }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    Loading.circle();
    const token = Cookies.get("tx") || "";
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      async () => {
        try {
          fetch(`${process.env.NEXT_PUBLIC_HOST}/users/keluar`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }).then(() => {
            Cookies.remove("tx");
            Cookies.remove("rtx");
            router.push("/login");
            Loading.remove();
          });
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
        className="flex rounded-xl shadow-sm cursor-pointer hover:shadow-sky-200  items-center p-1"
      >
        <FaUserCircle className="w-6 h-6 mb-1 text-sky-500 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-sky-500 cursor-pointer" />
        <p className="font-semibold ml-1">{props.user.username}</p>
      </div>
      <div
        id="dropdown"
        className={`z-10 bg-white divide-y divide-sky-100 rounded shadow w-44 absolute right-0 mt-2 py-2.5 text-sm text-sky-700 dark:text-sky-200 dark:bg-slate-800 ${
          isOpen ? "" : "hidden"
        }`}
      >
        {listMenu.map((item, i) => (
          <div
            onClick={() => router.push(item.href)}
            key={i}
            className="block px-4 cursor-pointer py-2 hover:bg-sky-100 dark:hover:bg-sky-600 dark:hover:text-white"
          >
            {item.label}
          </div>
        ))}
        <div
          onClick={handleLogout}
          className="block px-4 py-2 cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-600 dark:hover:text-white"
        >
          Keluar
        </div>
      </div>
    </div>
  );
}
