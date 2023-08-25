import { TextFooter } from "@/layouts/components/molecules";
import { Sidebar, BottomBar, AppBar } from "@/layouts/components/organisms";

export const metadata = {
  title: "Dashboard - sarrahman bangunan",
  description: "Sarrahman bangunan",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <div className="sm:ml-64">
        <div>
          <AppBar />
          <div className="p-4">{children}</div>
          <TextFooter />
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
