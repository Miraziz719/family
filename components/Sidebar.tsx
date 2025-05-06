'use client'
import { Activity, Baby, Calendar, ChevronDown, ChevronRight, ChevronUp, Divide, Files, Home, Inbox, Key, Search, Settings, User2, UtensilsCrossed } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import { 
  DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useProfileStore } from "@/store/profileStore"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { useTheme } from "next-themes"

// Menu items.
const items = [
  {
    title: "Hujjatlar",
    url: "#",
    icon: Files,
    children: [
      {title: 'Shaxsiy', url: '/document/personal'},
      {title: 'Tibbiy', url: '/document/medical'},
      {title: 'Boshqa', url: '/document/other'},
    ]
  },
  {
    title: "Yosh onalar uchun",
    url: "#",
    icon: Baby,
    children: [
      {title: 'Bola rivojlanishi', url: '/content'},
      {title: 'Bola kasallik belgilari', url: '/content'},
      {title: 'Ota onalar burchagi', url: '/content'},
    ]
  },
  {
    title: "Taomnoma",
    url: "#",
    icon: UtensilsCrossed,
    children: [
      {title: 'Ichimliklar', url: '/content'},
      {title: 'Taomlar', url: '/content'},
      {title: 'Shirinliklar', url: '/content'},
      {title: 'Salatlar', url: '/content'},
    ]
  },
  {
    title: "Birinchi tez tibbiy yordam",
    url: "/search",
    icon: Activity,
  }
]

export default function AppSidebar() {
  const { theme, setTheme } = useTheme(); 
  const { data: session, status } = useSession();
  const {profile} = useProfileStore();
  const router = useRouter()

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      signOut();
    }
  }, [status, session]); 

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/" className="text-black hover:text-gray-700 font-bold mx-auto">
            <Image
              src={theme === "dark" ? '/logo.png' : '/logo_d.png'}
              width={100}
              height={100}
              alt="logo"
            />
          </Link>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div key={item.title}>
                  {
                  item.children?.length 
                  ? 
                  <Collapsible key={item.title} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex justify-between items-center w-full">
                          <item.icon />
                          <span>{item.title}</span>        
                          <ChevronRight className="transition-transform ml-auto group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton> 
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children?.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuButton className="p-0">
                                <Link href={child.url} className="w-full h-full p-2">
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  :
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="p-0">
                      <Link href={item.url} className="w-full h-full p-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  }
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          { 
            session?.user && <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />
                    {
                      (profile.firstName && profile.firstName + ' ' + profile.lastName) || 
                      session?.user.email
                    }
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                      <span>Shaxsiy kabinet</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                    <span>Chiqish</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          }
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
