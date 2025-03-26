"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme(); 

  return (
    <header className="w-full bg-background shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Menu (Mobil uchun) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Navbar links (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>

      {/* Mobil menyu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-background p-4">
          <Link href="/" className="p-2" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="p-2" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="p-2" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
