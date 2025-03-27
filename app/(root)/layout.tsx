import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav"
import { SidebarProvider } from "@/components/ui/sidebar"
import Sidebar from "@/components/Sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <SidebarProvider>
      <Sidebar />
      <main className="flex-1 relative">
        <Header />
        <div className=" overflow-x-hidden">
        {children}
        </div>
        <div className="h-[68px] md:hidden"></div>
        <MobileNav />
      </main>
    </SidebarProvider>
    </>
  );
}
