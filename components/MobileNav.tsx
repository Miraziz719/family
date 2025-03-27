"use client";

import { useTheme } from "next-themes";
import { House, CircleUserRound, Search, Menu, UserRound } from 'lucide-react';
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "./ui/sidebar";

const mobileNav = [
  {text: 'Asosiy', link: "/", icon: <House />},
  {text: 'Profil', link: "/profile", icon: <UserRound/>},
  {text: 'Qidirish', link: "/search", icon: <Search />},
  {text: 'Menyu', link: "menu", icon: <Menu />},
]

export default function Header() {
  const router = useRouter();
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar();

  const handleClick = (link: string) => {
    if(link === 'menu') return toggleSidebar()
    router.push(link);
  };

  return (
    <div className="md:hidden w-full bg-background shadow-xl fixed bottom-0 border-t">
      <div className="container mx-auto flex items-center justify-between text-gray-600">
        {mobileNav.map(nav => (
          <button 
            key={nav.text} 
            onClick={() => handleClick(nav.link)}
            className={`
              p-3 flex flex-col items-center justify-center flex-1 hover:bg-gray-100 transition duration-300
              ${pathname === nav.link && "text-blue-500 font-bold"}
            `} 
            >
            {nav.icon}
            <p className="text-sm">{nav.text}</p>
          </button>)
        )}
      </div>
    </div>
  );
}
