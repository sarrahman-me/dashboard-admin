import { TextFooter } from "@/src/components/molecules";
import { Sidebar, BottomBar, AppBar } from "@/src/components/organisms";

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
    <div className="bg-white dark:bg-slate-800 dark:text-slate-50 min-h-screen">
      <Sidebar />
      <div className="sm:ml-64">
        <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
          <AppBar />
          <div className="p-4">{children}</div>
          <TextFooter />
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
