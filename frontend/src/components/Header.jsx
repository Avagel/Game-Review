import { faBars, faKipSign, faL } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { NavBar } from "./NavBar";
import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);
  const handleSearch = () => {
    console.log("searching");
    setIsOpen(false);
    setIsSearch((prev) => !prev);
  };
  const getText = () => {
    const location = useLocation();
    console.log("location", location);
    if (location.pathname.includes("browse")) return "Browse";
    if (location.pathname.includes("search")) return "Search";

    switch (location.pathname) {
      case "/":
        return "Home";
      case "/news":
        return "News";
      default:
        return "Overview";
    }
  };
  let text = getText();
  const handleSubmit = (e) => {
    e.preventDefault();

    let searchValue = inputRef.current.value;
    searchValue = searchValue.toLowerCase().trim();
    if (!searchValue) return;

    navigate(`/search/${searchValue}/1`);
  };
  const location = useLocation();
  useEffect(() => {
    setIsSearch(false);
  }, [location]);

  return (
    <div
      className={`fixed w-full  py-5 px-3 grid transision-all duration-300 ${
        isOpen ? "bg-zinc-950" : ""
      }  ${
        isSearch
          ? "grid-cols-[30px_100fr] items-center bg-zinc-900"
          : "grid-cols-3"
      } bg-gradient-to-b from-zinc-950  to-transparent z-7 `}
    >
      <FontAwesomeIcon
        icon={faCaretLeft}
        className="text-base text-white"
        onClick={() => {
          navigate(-1);
        }}
      />
      <p
        className={`text-base text-orange-500 tracking-widest font-medium cursor-pointer text-center ${
          isSearch ? "hidden" : ""
        } `}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {text.toUpperCase()}{" "}
        <FontAwesomeIcon
          icon={faCaretDown}
          className="transition-all duration-300 "
          style={isOpen ? { rotate: "180deg" } : ""}
        />
      </p>

      <div
        className={`text-right relative ${
          isSearch ? " flex items-center justify-end" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <input
            ref={inputRef}
            type="text"
            className={` transition-all duration-300 bg-zinc-600/50  backdrop-blur-[50px] text-white tracking-widest  rounded-md cursor-pointer ${
              isSearch ? "w-93/100 px-3  h-9" : "w-0 none"
            } right-0 text-xs `}
            placeholder="Search Game"
          />
          <FontAwesomeIcon
            icon={isSearch ? faXmark : faSearch}
            className="text-base text-white"
            onClick={handleSearch}
          />
        </form>
      </div>

      {isOpen ? (
        <NavBar
          getText={getText}
          closeMenu={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
    // <div
    //   className={`fixed w-full  py-5 px-9 flex justify-between items-center transision-all duration-300 z-5 `}
    // >
    //   <div className="w-1/3 ">
    //     <FontAwesomeIcon
    //       icon={faCaretLeft}
    //       className="text-base text-white "
    //       onClick={() => {
    //         navigate(-1);
    //       }}
    //     />
    //   </div>
    //   <nav className=" w-1/3  flex items-center  gap-3 text-white tracking-widest">
    //     <NavLink
    //       style={({ isActive }) => ({
    //         color: isActive ? "orange" : "",
    //       })}
    //       to={"/home"}
    //     >
    //       Home
    //     </NavLink>
    //     <NavLink
    //       to={"/browse/1"}
    //       style={({ isActive }) => ({
    //         color: isActive ? "orange" : "",
    //       })}
    //     >
    //       Browse
    //     </NavLink>
    //     <NavLink
    //       to={"/news"}
    //       style={({ isActive }) => ({
    //         color: isActive ? "orange" : "",
    //       })}
    //     >
    //       News
    //     </NavLink>
    //   </nav>

    //   <form onSubmit={handleSubmit} className="w-1/3 flex justify-end ">
    //     <input
    //       ref={inputRef}
    //       onChange={() => {
    //         console.log("iriu");
    //       }}
    //       type="text"
    //       className={` transition-all duration-300 bg-zinc-600/50  backdrop-blur-[50px] text-white tracking-widest  rounded-md cursor-pointer ${"w-60/100 px-3  h-7"} right-0 text-xs `}
    //       placeholder="Search Game"
    //     />
    //   </form>
    // </div>
  );
};
