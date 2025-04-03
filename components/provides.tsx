'use client';
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <ToastContainer position="top-right" autoClose={5000} />
      </ThemeProvider>
    </SessionProvider>
  );
}