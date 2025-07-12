"use client"

import * as React from "react"
import {
  Command,
  Settings2,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { AddInvoiceIcon, Home01Icon, Home07Icon, Settings01FreeIcons, Tag01Icon, Trolley02Icon, TwitterFreeIcons, TwitterIcon, UserAccountIcon, UserSearch01FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: () => <HugeiconsIcon icon={Home01Icon} className="w-10 h-10" />,
      isActive: true,
    },
    {
      title: "Suppliers",
      url: "/suppliers",
      icon: () => <HugeiconsIcon icon={Tag01Icon} />,
      isActive: true,
    },
        {
      title: "Customers",
      url: "/customers",
      icon: () => <HugeiconsIcon icon={UserAccountIcon} />,
      isActive: true,
    },
    {
      title: "Products",
      url: "#",
      icon: () => <HugeiconsIcon icon={Trolley02Icon} />,
      items: [
        {
          title: "Category",
          url: "/categories",
        },
        {
          title: "Units",
          url: "/units",
        },
        {
          title: "Item",
          url: "/products",
        },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: () => <HugeiconsIcon icon={AddInvoiceIcon} />,
      items: [
        {
          title: "Sales",
          url: "/sales  ",
        },
        {
          title: "Stock in / purchase",
          url: "/stock-in",
        },
        {
          title: "Stock out",
          url: "/stock-out",
        },
        {
          title: "Stock Opname",
          url: "#",
        },
         {
          title: "Stock Return",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Sales",
          url: "#",
        },
        {
          title: "Stock In/Out",
          url: "#",
        },
      ],
    },
  ],
   settings: [
    {
      title: "User / Employes",
      url: "/dashboard",
      icon: () => <HugeiconsIcon icon={UserSearch01FreeIcons} className="w-10 h-10" />,
      isActive: true,
    },
      {
      title: "Pengaturan",
      url: "/dashboard",
      icon: () => <HugeiconsIcon icon={Settings01FreeIcons} className="w-10 h-10" />,
      isActive: true,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} subTitle="Beranda" />
        <NavMain items={data.settings} subTitle="Pengaturan" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
