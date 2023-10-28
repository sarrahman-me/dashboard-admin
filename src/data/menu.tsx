"use client";
import {
  AiOutlineExperiment,
  AiOutlineHome,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdOutlineCardMembership, MdOutlineFeedback } from "react-icons/md";
import { BiCube, BiStore } from "react-icons/bi";
import { TbTools } from "react-icons/tb";
import { RiAccountCircleLine } from "react-icons/ri";
import { GrDocumentConfig } from "react-icons/gr";
import { PiUsersThree, PiMoneyThin } from "react-icons/pi";

export const menuItemsPageMobile = [
  {
    label: "Dashboard",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "Membership",
    icon: <MdOutlineCardMembership />,
    href: "/dashboard/membership",
  },
  {
    label: "Barang",
    icon: <BiCube />,
    href: "/dashboard/barang",
  },
  {
    label: "Webstore",
    icon: <BiStore />,
    href: "/dashboard/webstore",
  },
  {
    label: "Tools",
    icon: <TbTools />,
    href: "/dashboard/tools",
  },
  {
    label: "Experiment",
    icon: <AiOutlineExperiment />,
    href: "/dashboard/experiment",
  },
  {
    label: "Kritik & Saran",
    icon: <MdOutlineFeedback />,
    href: "/dashboard/feedback",
  },
  {
    label: "Account",
    icon: <RiAccountCircleLine />,
    href: "/dashboard/account",
  },
];

export const menuItemsMobile = [
  {
    label: "Dashboard",
    icon: <AiOutlineHome />,
    href: "/dashboard",
  },
  {
    label: "Membership",
    icon: <MdOutlineCardMembership />,
    href: "/dashboard/membership",
  },
  {
    label: "Barang",
    icon: <BiCube />,
    href: "/dashboard/barang",
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
    label: "Webstore",
    icon: <BiStore />,
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
    icon: <PiUsersThree />,
    title: "Suplier",
    listMenu: listSuplier,
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
    icon: <GrDocumentConfig />,
    title: "Configuration",
    listMenu: listConfiguration,
  },
];
