import React from "react";
import { Calendar, Home, Inbox, UserPlus, LogIn } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

// Test User data
const user = {
  name: "Rhitam Chaudhury",
};

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Playground",
    url: "/playground",
    icon: Inbox,
  },
  {
    title: "Manual",
    url: "/manual",
    icon: Calendar,
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Signup",
    url: "/signup",
    icon: UserPlus,
  },
];

const AppSidebar = (props) => {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-white bg-opacity-40 backdrop-blur-lg border-none shadow-xl rounded-r-xl rounded-l-none dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-lg" // Dark mode styles added
    >
      <SidebarContent>
        <SidebarGroup>
          <NavUser user={user} />
          <SidebarGroupLabel className="mt-8">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="mt-1" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
