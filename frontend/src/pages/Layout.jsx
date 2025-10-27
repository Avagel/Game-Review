import { Outlet } from "react-router";
import { NavBarMain } from "../components/NavBarMain";

export const Layout = () => {
  return (
    <>
      <div className="layout w-full relative bg-cover bg-center bg-zinc-950 h-screen overflow-y-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
        <NavBarMain />

        <Outlet />
      </div>
    </>
  );
};
