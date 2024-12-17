import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaygroundCard from "@/components/PlaygroundCard"; // PlaygroundCard component
import { toggleTheme } from "@/store"; // Redux action for theme toggle

const Playground = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Fetch the current theme

  // Apply theme class to body when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]); // Only run when theme changes

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Playground Card */}
      <PlaygroundCard className="w-[500px] space-y-6" />
    </div>
  );
};

export default Playground;
