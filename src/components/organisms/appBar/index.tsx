"use client";
import { useEffect, useState } from "react";
import { GetDataApi } from "@/src/utils";
import { ProfileAppBar } from "../../molecules";
import { ResizeLayarButton, ToggleDarkMode } from "../../atoms";
import { Report } from "notiflix";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AppBar() {
  const router = useRouter();
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/auth/user/profile`
        );
        if (response?.status === 401) {
          window.location.reload();
        } else if (response?.status === 404) {
          Report.failure("Kesalahan Auth", response?.message, "Okay", () => {
            Cookies.remove("tx");
            router.push("/login");
          });
        }
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="select-none p-6 px-8 md:p-12 md:px-16 flex justify-end sm:justify-between items-center">
      <div className="hidden sm:flex divide-x-8 divide-transparent">
        <ResizeLayarButton />
        <ToggleDarkMode />
      </div>
      <ProfileAppBar user={user} />
    </div>
  );
}
