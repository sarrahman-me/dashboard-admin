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

export const menuItems = [
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
];

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
