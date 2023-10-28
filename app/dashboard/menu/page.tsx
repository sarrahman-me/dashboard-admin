"use client";
import { Button, Container, Typography } from "@/src/components";
import { menuDropdownItems, menuItemsPageMobile } from "@/src/data/menu";
import { DeleteDataApi } from "@/utils";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Confirm, Loading } from "notiflix";

const Menu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Loading.circle();
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      async () => {
        try {
          const responseLogout = await DeleteDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/auth/user/logout`
          );
          if (responseLogout.success) {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            window.location.reload();
            Loading.remove();
          }
        } catch (error) {
          console.error(error);
          Loading.remove();
        }
      },
      () => {
        Loading.remove();
      },
      {
        okButtonBackground: "#FF0000",
        titleColor: "#FF0000",
      }
    );
  };

  return (
    <div>
      <div>
        {menuDropdownItems.map((menu, i) => (
          <div key={i}>
            <div className="flex items-center my-3">
              <div className="mr-2 text-lime-500 text-lg">{menu.icon}</div>
              <Typography variant="subtitle">{menu.title}</Typography>
            </div>
            <Container otherClass="p-3">
              {menu.listMenu.map((m, i) => (
                <div
                  onClick={() => router.push(m.href)}
                  key={i}
                  className="border-b last:border-none border-gray-400 cursor-pointer py-2"
                >
                  <Typography>{m.label}</Typography>
                </div>
              ))}
            </Container>
          </div>
        ))}
      </div>
      <Button onClick={handleLogout} variant="text" size="full">
        Keluar
      </Button>
    </div>
  );
};

export default Menu;
