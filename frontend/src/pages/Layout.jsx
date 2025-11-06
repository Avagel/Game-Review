import { Outlet } from "react-router";
import grid from "../assets/grid.png";
import { NavBarMain } from "../components/NavBarMain";

export const Layout = () => {
  return (
    <>
      <div className="layout  w-full relative bg-cover bg-center bg-zinc-950 h-screen overflow-y-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
        <NavBarMain />

        <Outlet />
        <img
          src={grid}
          className="absolute w-full h-full inset-0 opacity-7 z-0"
          alt=""
        />
      </div>
    </>
  );
};
