import React from "react";
import { menuItemsMobile } from "@/src/data/menu";
import { ItemTopBar } from "../../atoms";

/**
 *
 * TopBar adalah susunan icon sesuai halaman navigasi dari aplikasi dashboard
 *
 */

const TopBar = () => {
  return (
    <div className="z-50 w-full h-16 sm:hidden border-b border-gray-200 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
        {menuItemsMobile.map((item, i) => (
          <ItemTopBar
            label={item.label}
            key={i}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default TopBar;
