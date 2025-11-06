import { useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import {
  Compass,
  Earth,
  Gamepad,
  Github,
  House,
  Linkedin,
  Search,
  Twitter,
  X,
} from "lucide-react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const NavBarMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);
  const [current, setCurrent] = useState(location.pathname);

  const getCurrentIcon = () => {
    console.log("location", location);
    if (location.pathname.includes("browse"))
      return <Compass size={15} color="white" />;
    if (location.pathname.includes("search"))
      return <Search size={15} color="white" />;
    switch (location.pathname) {
      case "/":
        return <House size={15} color="white" />;
      case "/news":
        return <Earth size={15} color="white" />;
      default:
        return <Gamepad size={15} color="white" />;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let searchValue = inputRef.current.value;
    searchValue = searchValue.toLowerCase().trim();
    if (!searchValue) return;

    navigate(`/search/${searchValue}/1`);
  };
  useEffect(() => {
    setIsSearch(false);
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div
      className={`${
        isSearch
          ? "sticky lg:top-3"
          : "fixed lg:left-[50%] lg:-translate-x-[50%]"
      } top-[85%] z-5  w-full justify-center flex gap-2 lg:top-0    `}
    >
      {isSearch ? (
        <div className="h-12 w-[90%] lg:w-[40%]  rounded-3xl bg-zinc-950/80 backdrop-blur-lg flex items-center gap-0 border border-orange-500 overflow-auto shrink-0 [scrollbar-width:none] [-webkit-scrollbar:display:none] transition-all duration-300 ">
          <form className="w-[90%] h-full" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              autoFocus={true}
              type="text"
              placeholder="Search for Game"
              className="w-full h-full px-5 tracking-wider  text-sm text-white/80 outline-0"
            />
          </form>
          <button
            onClick={() => {
              setIsSearch(false);
            }}
            className="bg-zinc-900 mr-1 shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center "
          >
            {" "}
            <X size={15} color="white" />{" "}
          </button>
        </div>
      ) : (
        <div className="h-12 w-[70%] rounded-3xl lg:rounded-none lg:bg-zinc-900/90 shadow-md bg-zinc-900/80  backdrop-blur-lg flex items-center md:justify-center gap-0  overflow-auto shrink-0 px-5 [scrollbar-width:none] [-webkit-scrollbar:display:none] transition-all duration-300 lg:w-full lg:justify-center lg:gap-6 ">
          <button
            onClick={() => {
              navigate("/");
            }}
            className={`w-12 h-10 rounded-full shrink-0 flex hover:text-amber-500  items-center mr-3 justify-center ${
              current == "/" ? "text-amber-500" : " text-white/80"
            } `}
          >
            <House size={15} className="lg:hidden" />
            <p className="hidden lg:text-sm  lg:tracking-wide lg:block hover:te">
              Home
            </p>
          </button>

          <button
            onClick={() => {
              navigate("/browse");
            }}
            className={`w-12 rounded-full h-10   hover:text-amber-500 shrink-0  items-center mr-3 justify-center flex ${
              current.includes("browse") ? "text-amber-500 " : " text-white/80 "
            } `}
          >
            <Compass size={15} className="shrink-0 lg:hidden" />
            <p className="hidden lg:text-sm  lg:tracking-wide lg:block">
              Discover
            </p>
          </button>

          <button
            onClick={() => {
              setIsSearch(true);
            }}
            className={`w-12 h-10 rounded-full shrink-0 hover:text-amber-500  items-center mr-3 justify-center flex text-white/80 `}
          >
            <Search size={15} className="shrink-0 lg:hidden" />
            <p className="hidden lg:text-sm  lg:tracking-wide lg:block">
              Search
            </p>
          </button>

          <button
            onClick={() => {
              navigate("/news");
            }}
            className={`w-12 h-10 rounded-full hover:text-amber-500  shrink-0 flex items-center mr-3 justify-center  ${
              current.includes("news") ? "text-amber-500" : " text-white/80"
            } `}
          >
            <Earth size={15} className="lg:hidden" />
            <p className="hidden lg:text-sm  lg:tracking-wide lg:block">News</p>
          </button>

          <button
            className={`w-12 h-10 rounded-full hover:bg-orange-500  flex shrink-0 items-center mr-3 justify-center  lg:hidden`}
          >
            <Github size={15} color="white" />
          </button>
          <button
            className={`w-12 h-10 rounded-full hover:bg-orange-500  shrink-0  items-center mr-3 justify-center flex  lg:hidden`}
          >
            <Twitter size={15} color="white" />
          </button>
          <button
            className={`w-12 h-10 rounded-full hover:bg-orange-500  flex shrink-0 items-center mr-3 justify-center  lg:hidden`}
          >
            <Linkedin size={15} color="white" className="" />
          </button>
        </div>
      )}
    </div>
  );
};
