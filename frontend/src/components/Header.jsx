import { faBars, faKipSign } from "@fortawesome/free-solid-svg-icons";
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

    navigate(`/search/${searchValue}`);
  };

  return (
    <div
      className={`w-full sticky top-0  py-5 px-3 grid transision-all duration-300  ${
        isSearch ? "grid-cols-[30px_100fr] items-center" : "grid-cols-3"
      } bg-zinc-950/60 backdrop-blur-xl z-7 shadow-[0_3px_3px_rgb(0,0,0)]`}
    >
      <FontAwesomeIcon
        icon={faCaretLeft}
        onClick={() => {
          navigate(-1);
        }}
      />

      <p
        className={`text-sm font-medium cursor-pointer text-center ${
          isSearch ? "hidden" : ""
        } `}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {text}{" "}
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
            className={` transition-all duration-300 bg-zinc-800  rounded-md cursor-pointer ${
              isSearch ? "w-93/100 px-3  h-9" : "w-0 none"
            } right-0 text-xs `}
            placeholder="Search Game"
          />
          <FontAwesomeIcon
            icon={isSearch ? faXmark : faSearch}
            className="text-xs"
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
  );
};
