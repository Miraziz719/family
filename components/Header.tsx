"use client";

import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme(); 

  return (
    <header className="bg-background border-b sticky top-0">
      <div className="flex items-center justify-between p-4">
        <SidebarTrigger />

        <Link href="/" className="md:hidden text-xl font-bold">
          MyApp
        </Link>


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
