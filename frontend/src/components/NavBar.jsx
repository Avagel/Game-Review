import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router";

export const NavBar = ({ getText, closeMenu }) => {
  const [height, setHeight] = useState("0");
  const [position, setPosition] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let current = getText();

  useEffect(() => {
    setHeight("147px");
    setIsOpen(true);
    console.log(height);
  });

  return (
    <div
      className="bg-zinc-950  w-full absolute top-full transition-all duration-300 text-sm font-medium flex flex-col gap-2 items-center py-3"
      style={{ height }}
    >
      <NavLink
        to="/"
        onClick={closeMenu}
        className={`w-90/100 bg-zinc-800 rounded-md flex items-center text-zinc-300 justify-center py-2  ${
          current == "Home"
            ? "border-orange-500 text-white border-b-[1px]"
            : " text-zinc-300"
        }`}
      >
        Home
      </NavLink>

      <NavLink
        to="browse"
        onClick={closeMenu}
        className={`w-80/100 bg-zinc-800 rounded-md flex transition-all duration-400 items-center justify-center py-2  ${
          current == "Browse"
            ? "border-orange-500 text-white border-b-[1px]"
            : " text-zinc-300"
        }`}
        style={{ transform: `translateY(${isOpen ? "0%" : "-100%"}` }}
      >
        Browse
      </NavLink>
      <NavLink
        to="news"
        onClick={closeMenu}
        className={`w-70/100 bg-zinc-800 transition-all duration-400 rounded-md  flex items-center justify-center  py-2  ${
          current == "News"
            ? "border-orange-500 text-white border-b-[1px]"
            : " text-zinc-300"
        }`}
        style={{ transform: `translateY(${isOpen ? "0%" : "-200%"})` }}
      >
        News
      </NavLink>
    </div>
  );
};
