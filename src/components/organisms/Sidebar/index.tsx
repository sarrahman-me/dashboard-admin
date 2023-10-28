"use client";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconButton, ItemSidebar, Logo } from "@/src/components";
import { menuDropdownItems, menuItems, personalMenu } from "@/src/data/menu";
import { DropdownList } from "@/layouts/components/molecules";

/**
 * Komponen Sidebar digunakan untuk membuat sidebar yang dapat diperluas atau ditutup.
 *
 * @param {boolean} expand - Menentukan apakah sidebar sedang diperluas atau ditutup.
 * @param {function} setExpand - Fungsi yang digunakan untuk mengatur status perluasan sidebar.
 */

interface SidebarProps {
  expand: boolean;
  setExpand: (v: boolean) => void;
}

const Sidebar = ({ expand, setExpand }: SidebarProps) => {
  const icon = expand ? <IoIosArrowDropleft /> : <IoIosArrowDropright />;

  const classWidth = expand ? "w-64" : "w-16";

  const classNameSidebar = `bg-white dark:bg-gray-900 fixed top-0 left-0 z-40 h-screen ease-linear select-none overflow-y-scroll transition-transform -translate-x-full sm:translate-x-0 ${classWidth}`;

  return (
    <aside className={classNameSidebar}>
      <div
        className={`flex mt-5 ${
          expand ? "justify-between" : "justify-center"
        } items-center m-2`}
      >
        {expand && <Logo />}
        <IconButton
          size="small"
          onClick={() => setExpand(!expand)}
          icon={icon}
        />
      </div>

      <div className="my-10 mx-3 border-b border-gray-200 dark:border-gray-600">
        {menuItems.map((item, i) => (
          <div key={i}>
            <ItemSidebar
              expand={expand}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
        {menuDropdownItems.map((item, i) => (
          <DropdownList
            expand={expand}
            iconComponent={item.icon}
            title={item.title}
            listMenu={item.listMenu}
            key={i}
          />
        ))}
      </div>

      <div className="my-5 mx-3">
        {personalMenu.map((item, i) => (
          <div key={i}>
            <ItemSidebar
              expand={expand}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
