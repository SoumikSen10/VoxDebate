import React from "react";
import { Calendar, Home, Inbox } from "lucide-react";
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
import { SidebarButtons } from "./SidebarButtons";

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
];

const AppSidebar = (props) => {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-white bg-opacity-40 backdrop-blur-lg border-none shadow-xl rounded-r-xl rounded-l-none dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-lg fixed top-0 left-0 bottom-0 z-50"
    >
      <SidebarContent>
        <SidebarGroup>
          <NavUser
            user={user}
            className="hover:shadow-md hover:ring-2 hover:ring-gray-300 p-2 rounded-lg transition-all duration-300"
          />
          <SidebarGroupLabel className="mt-8">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="mt-1" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <item.icon className="mr-3 transition-all duration-300" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6">
          <SidebarButtons />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
