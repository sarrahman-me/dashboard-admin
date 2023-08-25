import Image from "next/image";
import logo from "@/public/logo.png";
import { FaCube, FaUsers, FaSitemap, FaMoneyBill } from "react-icons/fa";
import { MdDashboard, MdCardMembership } from "react-icons/md";
import { DropdownList, ListIcon } from "@/layouts/components/molecules";

const menuItems = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    href: "/dashboard",
  },
];

const listBarang = [
  {
    label: "Barang",
    href: "/dashboard/products/barang",
  },
  {
    label: "Kategori Barang",
    href: "/dashboard/products/kategori-barang",
  },
  {
    label: "Tekstur",
    href: "/dashboard/products/tekstur",
  },
  {
    label: "Motif",
    href: "/dashboard/products/motif",
  },
  {
    label: "Kualitas",
    href: "/dashboard/products/kualitas",
  },
  {
    label: "Ukuran",
    href: "/dashboard/products/ukuran",
  },
  {
    label: "Warna",
    href: "/dashboard/products/warna",
  },
];

const listSuplier = [
  {
    label: "Brand",
    href: "/dashboard/suplier/brand",
  },
  {
    label: "Pemasok",
    href: "/dashboard/suplier/pemasok",
  },
];

const listFinance = [
  {
    label: "Transaksi",
    href: "/dashboard/finance/transaksi",
  },
  {
    label: "Tipe",
    href: "/dashboard/finance/tipe",
  },
  {
    label: "Kategori",
    href: "/dashboard/finance/kategori",
  },
];

const listMembership = [
  {
    label: "Mitra",
    href: "/dashboard/membership/mitra",
  },
  {
    label: "Kategori Membership",
    href: "/dashboard/membership/kategori",
  },
  {
    label: "Kategori Harga",
    href: "/dashboard/membership/harga",
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
            iconComponent={<FaCube />}
            title="Barang"
            listMenu={listBarang}
          />
          <DropdownList
            iconComponent={<FaUsers />}
            title="Suplier"
            listMenu={listSuplier}
          />
          <DropdownList
            iconComponent={<FaMoneyBill />}
            title="Finance"
            listMenu={listFinance}
          />
          <DropdownList
            iconComponent={<MdCardMembership />}
            title="Membership"
            listMenu={listMembership}
          />
        </ul>
      </div>
    </aside>
  );
}
