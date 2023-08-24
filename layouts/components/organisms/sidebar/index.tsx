import Image from "next/image";
import logo from "@/public/logo.png";
import { FaTachometerAlt, FaCube, FaUsers, FaSitemap } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillDatabaseFill } from "react-icons/bs";
import { DropdownList, ListIcon } from "@/layouts/components/molecules";

const menuItems = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    href: "/dashboard",
  },
  {
    label: "Barang",
    icon: <FaCube />,
    href: "/dashboard/barang",
  },
  {
    label: "Suplier",
    icon: <FaUsers />,
    href: "/dashboard/suplier",
  },
  {
    label: "Mitra",
    icon: <FaSitemap />,
    href: "/dashboard/mitra",
  },
];

const listMenu = [
  {
    label: "Brand",
    href: "/dashboard/data/brand",
  },
  {
    label: "Kategori Barang",
    href: "/dashboard/data/kategori-barang",
  },
  {
    label: "Tekstur",
    href: "/dashboard/data/tekstur",
  },
  {
    label: "Motif",
    href: "/dashboard/data/motif",
  },
  {
    label: "Kualitas",
    href: "/dashboard/data/kualitas",
  },
  {
    label: "Ukuran",
    href: "/dashboard/data/ukuran",
  },
  {
    label: "Warna",
    href: "/dashboard/data/warna",
  },
];

export default function Sidebar() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 select-none"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="justify-center flex">
          <Image
            className="h-16 w-16 bg-indigo-500 dark:bg-transparent rounded-xl"
            src={logo}
            alt="logo"
          />
        </div>
        <ul className="space-y-3 mt-5 m-2 pl-3 font-medium">
          {menuItems.map((item) => (
            <ListIcon
              key={item.label}
              href={item.href}
              text={item.label}
              iconComponent={item.icon}
            />
          ))}
          <DropdownList
            iconComponent={<BsFillDatabaseFill />}
            title="Master Data"
            listMenu={listMenu}
          />
        </ul>
      </div>
    </aside>
  );
}
