import React from "react";

import Header from "./Header";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store";

import { Button } from "@/components/ui/button";

const Titlebar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  return (
    <div className="flex items-center -mt-8 space-x-6">
      <Button
        onClick={() => dispatch(toggleTheme())}
        className={`${
          theme === "light"
            ? "bg-yellow-300 text-black"
            : "bg-gray-600 text-white"
        }  p-3 ml-12 rounded-full `}
      >
        {theme === "light" ? " Light" : " Dark "}
      </Button>
      <div className="flex justify-center w-full">
        <Header />
      </div>
    </div>
  );
};

export default Titlebar;
