import { Outlet } from "react-router";
import grid from "../assets/grid.png";
import { NavBarMain } from "../components/NavBarMain";
import first from "../assets/bg first.jpg";

export const Layout = () => {
  return (
    <>
      <div
        className="  w-full relative bg-cover bg-center bg-zinc-950 min-h-[100dvh] pb-[env(safe-area-inset-bottom)] overflow-hidden page"
        style={{
          // backgroundImage: `url(${first})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
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
