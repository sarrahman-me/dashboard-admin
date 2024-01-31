"use client";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCardMembership } from "react-icons/md";
import { BiCube, BiStore } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { PiUsersThree, PiMoneyThin } from "react-icons/pi";
import { BsRobot } from "react-icons/bs";

export const menuItemsMobile = [
  {
    label: "Dashboard",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "Mitra",
    icon: <PiUsersThree />,
    href: "/dashboard/membership/mitra",
  },
  {
    label: "Barang",
    icon: <BiCube />,
    href: "/dashboard/products/barang",
  },
  {
    label: "ChatBot",
    icon: <BsRobot />,
    href: "/dashboard/chatbot",
  },
  {
    label: "Webstore",
    icon: <BiStore />,
    href: "/dashboard/webstore",
  },
  {
    label: "Menu",
    icon: <AiOutlineMenu />,
    href: "/dashboard/menu",
  },
];

export const personalMenu = [
  {
    label: "Account",
    icon: <RiAccountCircleLine />,
    href: "/dashboard/account",
  },
];

export const menuItems = [
  {
    label: "Dashboard",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "ChatBot (Uji Coba)",
    icon: <BsRobot />,
    href: "/dashboard/chatbot",
  },
];

const listWebstore = [
  {
    label: "Webstore",
    href: "/dashboard/webstore",
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
  {
    label: "Tag gambar",
    href: "/dashboard/products/tag-image",
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
  {
    label: "Voucher",
    href: "/dashboard/finance/voucher",
  },
];

const listMembership = [
  {
    label: "Mitra",
    href: "/dashboard/membership/mitra",
  },
  {
    label: "Klasifikasi Membership",
    href: "/dashboard/membership/klasifikasi",
  },
  {
    label: "Kategori Harga",
    href: "/dashboard/membership/kategori-harga",
  },
];

const listConfiguration = [
  {
    label: "Domain",
    href: "/dashboard/configuration/domain",
  },
];

export const menuDropdownItems = [
  {
    icon: <BiCube />,
    title: "Barang",
    listMenu: listBarang,
  },
  {
    icon: <PiMoneyThin />,
    title: "Finance",
    listMenu: listFinance,
  },
  {
    icon: <MdOutlineCardMembership />,
    title: "Membership",
    listMenu: listMembership,
  },
  {
    icon: <BiStore />,
    title: "Webstore",
    listMenu: listWebstore,
  },
  {
    icon: <PiUsersThree />,
    title: "Suplier",
    listMenu: listSuplier,
  },
  {
    icon: <AiOutlineSetting />,
    title: "Configuration",
    listMenu: listConfiguration,
  },
];
