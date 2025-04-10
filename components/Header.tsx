"use client";

import Link from "next/link";
import { Sun, Moon, ChevronRight, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";
import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";
import Image from 'next/image'

const breadcrumbNames: { [key: string]: string } = {
  content: "Bloglar",
  profile: "Profil",
  search: "Qidirish",
};

export default function Header() {
  const { theme, setTheme } = useTheme(); 
  const router = useRouter()
  const { data: session, status } = useSession();
  const {profile, loadProfileFromAPI} = useProfileStore();

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const label = (segment: string) => breadcrumbNames[segment] || decodeURIComponent(segment);

  useEffect(() => {
    if(status === 'loading' || !session?.user) return
    loadProfileFromAPI()
  }, [status]);

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="flex items-center gap-4 p-4">
        <SidebarTrigger className="hidden md:block" />

        {/* <Link href="/" className="md:hidden text-xl font-bold">
          MyApp
        </Link> */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="text-black hover:text-gray-700 font-bold my-[-16px]">
            <Image
              src={theme === "dark" ? '/logo_dark.png' : '/logo_white.png'}
              width={65}
              height={65}
              alt="logo"
              className="md:hidden"
            />
            <div className={`hidden md:block ${theme === "dark" && 'text-white'}`}>Asosiy</div>
          </Link>

          
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;
            return (
              <div key={index} className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4" />
                {!isLast ? (
                  <Link href={href} className="hover:text-gray-800 capitalize">{label(segment)}</Link>
                ) : (
                  <span className="text-gray-600 font-semibold capitalize">{label(segment)}</span>
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

        {
          session?.user 
          ?
          <Avatar onClick={() => router.push('/profile')}>
            <AvatarImage src={profile.avatar} />
            <AvatarFallback><User2/></AvatarFallback>
          </Avatar>
          :
          <Button
            onClick={() => router.push('/auth/login')}
          >
            Kirish 
          </Button>
        }

      </div>
    </header>
  );
}
