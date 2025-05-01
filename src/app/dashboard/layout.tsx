import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col">
        <header className="bg-background sticky top-0 z-10 flex h-16 items-center  gap-4 border-b px-4 sm:px-6">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold tracking-tight">Nazal</h1>
          <div className="ml-auto flex items-center space-x-4"></div>
        </header>
        <>
          <div className="flex-1 p-4 sm:p-6">{children}</div>
        </>
      </main>
    </SidebarProvider>
  );
}
