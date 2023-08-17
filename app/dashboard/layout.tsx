import { TextFooter } from "@/src/components/molecules";
import { Sidebar, BottomBar, AppBar } from "@/src/components/organisms";

export const metadata = {
  title: "Dashboard - Dunia Keramik",
  description: "Dunia Keramik",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-950 dark:text-slate-50 min-h-screen">
      <Sidebar />
      <div className="sm:ml-64">
        <AppBar />
        <div className="p-4">
          {children}
          <TextFooter />
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
