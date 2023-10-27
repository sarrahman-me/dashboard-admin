"use client";
import { useState } from "react";
import { IconButton, Logo } from "../../atoms";
import { NavGroup } from "../../molecules";
import { CgMenu } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

/**
 * Komponen `NavBar` adalah navigasi utama untuk situs web. Ini mencakup logo situs, tombol hamburger untuk menu responsif di perangkat seluler, dan daftar tautan menu. Saat tombol hamburger diklik, tautan menu akan ditampilkan atau disembunyikan.
 *
 * @param {Array} pages - Daftar halaman dengan label dan URL.
 */

interface NavBarProps {
  pages: {
    label: string;
    href: string;
  }[];
}

const NavBar = ({ pages }: NavBarProps) => {
  // State untuk mengontrol tampilan tautan menu

  const [expand, setExpand] = useState(false);

  // Tombol hamburger akan menampilkan ikon panah silang ketika menu diperluas, dan ikon menu saat menu ditutup

  const icon = expand ? <RxCross1 /> : <CgMenu />;

  return (
    <div>
      <div className="flex items-center justify-between p-3 lg:px-10 md:px-5 transition">
        {/* logo */}
        <div className="cursor-pointer">
          <Link href="/">
            <Logo size="large" />
          </Link>
        </div>

        <div className="flex md:hidden">
          {/* Tombol hamburger yang memicu perluasan dan penyusutan menu */}

          <IconButton
            size="small"
            onClick={() => setExpand(!expand)}
            icon={icon}
          />
        </div>
        <div className="hidden md:flex">
          {/* Tautan menu dalam format horizontal pada tampilan desktop */}

          <NavGroup pages={pages} direction={"horizontal"} />
        </div>
      </div>
      {expand && (
        // Tautan menu dalam format vertikal ketika tombol hamburger diklik pada tampilan perangkat seluler

        <div className="flex justify-center">
          <NavGroup pages={pages} direction={"vertical"} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
