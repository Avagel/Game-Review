import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const Layout = () => {
  return (
    <>
      <div className="layout w-full relative bg-cover bg-center bg-zinc-900 h-screen overflow-y-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
        <Header text={"Home"} />
        <Outlet />
      </div>
    </>
  );
};
