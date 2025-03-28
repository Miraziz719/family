"use client";

import Link from "next/link";
import { Sun, Moon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

const breadcrumbNames: { [key: string]: string } = {
  content: "Bloglar",
  profile: "Profil",
  search: "Qidirish",
};

export default function Header() {
  const { theme, setTheme } = useTheme(); 

  const pathname = usePathname(); // Joriy yo‘lni olish: "/products/laptops/dell"
  const pathSegments = pathname.split("/").filter((segment) => segment); // ['products', 'laptops', 'dell']

  const label = (segment: string) => breadcrumbNames[segment] || decodeURIComponent(segment);

  return (
    <header className="bg-background border-b sticky top-0">
      <div className="flex items-center gap-4 p-4">
        <SidebarTrigger className="hidden md:block" />

        {/* <Link href="/" className="md:hidden text-xl font-bold">
          MyApp
        </Link> */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="text-black hover:text-gray-700 font-bold">FamilyApp</Link>
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/"); // Har bir segment uchun URL yaratish
            const isLast = index === pathSegments.length - 1;
            return (
              <div key={index} className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4" />
                {!isLast ? (
                  <Link href={href} className="hover:text-gray-900 capitalize">{label(segment)}</Link>
                ) : (
                  <span className="text-gray-700 font-semibold capitalize">{label(segment)}</span>
                )}
              </div>
            );
          })}
        </nav>

        <div className=" grow"></div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
    </header>
  );
}
