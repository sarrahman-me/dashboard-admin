"use client";
import { ProfileAppBar } from "../../molecules";
import { ResizeLayarButton, ToggleDarkMode } from "../../atoms";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const router = useRouter();

  return (
    <div className="select-none p-2 px-4 md:p-4 md:px-8 flex justify-end sm:justify-between items-center">
      <div className="hidden sm:flex divide-x-8 divide-transparent">
        <ResizeLayarButton />
        <ToggleDarkMode />
      </div>
      <ProfileAppBar />
    </div>
  );
}
