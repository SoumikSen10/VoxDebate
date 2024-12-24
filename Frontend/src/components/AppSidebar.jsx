import React, { useState, useContext, useEffect } from "react";
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

import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const AppSidebar = (props) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false); // Track if profile is fetched
  const navigate = useNavigate();

  // Fetch profile when userInfo changes (e.g., after login)
  useEffect(() => {
    if (!userInfo || profileFetched) return; // Avoid fetching if already fetched or no userInfo

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/profile",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setUserInfo(response.data);
          toast.success("Profile loaded successfully!", {
            autoClose: 2000,
          });
        } else {
          setUserInfo(null);
          toast.warn("Unable to load profile. Please log in.", {
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUserInfo(null);
      } finally {
        setProfileFetched(true); // Set flag to prevent further fetching
      }
    };

    fetchProfile();
  }, [userInfo, profileFetched, setUserInfo]); // Only fetch if userInfo exists and profile hasn't been fetched yet

  // Handle screen resize to determine if it's mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 954);
    };

    handleResize(); // Run once on mount to set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUserInfo(null); // Clear user info on logout
        toast.success("You have been logged out successfully!", {
          autoClose: 2000,
        });
        setProfileFetched(false); // Reset profile fetch flag
        setTimeout(() => {
          navigate("/"); // Redirect to home after logout
        }, 2000);
      } else {
        console.error("Logout failed with status:", response.status);
        toast.warn("Logout failed. Please try again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Logout failed with error:", error);
      toast.error("An error occurred during logout. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  const isLoggedIn = Boolean(userInfo?.data?.username);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-white bg-opacity-40 backdrop-blur-lg border-none shadow-xl rounded-r-xl rounded-l-none dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-lg"
    >
      <SidebarContent>
        <SidebarGroup>
          {userInfo ? (
            <NavUser user={userInfo.data} />
          ) : (
            <NavUser user="Guest" />
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mt-1">
                <SidebarMenuButton asChild>
                  <NavLink to="/">
                    <Home />
                    <span>Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mt-1">
                <SidebarMenuButton asChild>
                  <NavLink to="/playground">
                    <Inbox />
                    <span>Playground</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mt-1">
                <SidebarMenuButton asChild>
                  <NavLink to="/manual">
                    <Calendar />
                    <span>Manual</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isLoggedIn ? (
                <SidebarMenuItem className="mt-1">
                  <SidebarMenuButton asChild>
                    <button
                      onClick={logout}
                      className="w-full flex items-center"
                    >
                      <LogIn />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <>
                  <SidebarMenuItem className="mt-1">
                    <SidebarMenuButton asChild>
                      <NavLink to="/login">
                        <LogIn />
                        <span>Login</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="mt-1">
                    <SidebarMenuButton asChild>
                      <NavLink to="/signup">
                        <UserPlus />
                        <span>Signup</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
