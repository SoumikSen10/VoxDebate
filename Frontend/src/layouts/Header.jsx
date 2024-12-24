import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Correct import for react-router-dom in React + Vite
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"; // Uncomment this if you have the Icons module
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

// Define the ListItem component
const ListItem = ({ title, href, onClick, children }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        onClick={onClick}
        className="flex justify-between rounded-md p-3 text-sm font-medium text-muted-foreground hover:bg-muted focus:outline-none"
      >
        <span>{title}</span>
        <span className="text-xs text-muted-foreground">{children}</span>
      </a>
    </NavigationMenuLink>
  </li>
);

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 954);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return null; // Hide Header in mobile view
  }

  const handleLinkClick = (event, path) => {
    event.preventDefault(); // Prevent the default link behavior
    if (userInfo) {
      navigate(path);
    } else {
      toast.info("Please log in to access the playground!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Explore
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Why use Vox Debate?
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about" title="Introduction"></ListItem>
                <ListItem
                  onClick={(e) => handleLinkClick(e, "/manual")}
                  title="Guide"
                ></ListItem>
                <ListItem href="/testimonials" title="Testimonials"></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
            <NavigationMenuContent className="px-40 py-10 text-lg font-medium bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg">
              Coming Soon !
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
            <NavigationMenuContent className="px-40 py-10 text-lg font-medium bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg">
              Coming Soon !
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ToastContainer />
    </>
  );
};

export default Header;
