"use client";
import { Confirm, Loading } from "notiflix";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
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
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      () => {
        try {
          fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/user/logout`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }).then(() => {
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
        className="flex justify-center rounded-xl text-amber-950 dark:text-amber-50 cursor-pointer hover:shadow-amber-200  items-center p-1"
      >
        <FaUser className="w-5 h-5 mb-1 text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-500 cursor-pointer" />
      </div>
      <div
        id="dropdown"
        className={`z-10 bg-white divide-y divide-amber-100 rounded shadow w-44 absolute right-0 mt-2 text-sm text-amber-700 dark:text-amber-200 dark:bg-slate-800 ${
          isOpen ? "" : "hidden"
        }`}
      >
        {listMenu.map((item, i) => (
          <div
            onClick={() => router.push(item.href)}
            key={i}
            className="block px-4 cursor-pointer py-2 rounded-sm hover:bg-amber-100 dark:hover:bg-amber-600 dark:hover:text-white"
          >
            {item.label}
          </div>
        ))}
        <div
          onClick={handleLogout}
          className="block px-4 py-2 cursor-pointer rounded-sm hover:bg-amber-100 dark:hover:bg-amber-600 dark:hover:text-white"
        >
          Keluar
        </div>
      </div>
    </div>
  );
}
