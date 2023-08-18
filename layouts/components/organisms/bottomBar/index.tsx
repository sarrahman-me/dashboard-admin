"use client";
import { useRouter } from "next/navigation";
import { FaHome, FaCube, FaUsers, FaSitemap } from "react-icons/fa";

const menuItems = [
  {
    label: "Dashboard",
    icon: (
      <FaHome className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    href: "/dashboard",
  },
  {
    label: "Barang",
    icon: (
      <FaCube className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    href: "/dashboard/barang",
  },
];

export default function BottomBar() {
  const router = useRouter();

  return (
    <div className="select-none sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        {menuItems.map((item) => (
          <div
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            key={item.label}
            onClick={() => router.push(item.href)}
          >
            <button
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              type="button"
            >
              {item.icon}
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                {item.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
