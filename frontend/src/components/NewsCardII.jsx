import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router";

export const NewsCardII = ({ article }) => {
  const [isActive, setIsActive] = useState(false);
  const initialClass =
    "h-fit p-3 w-full bg-zinc-800/60 transition-all duration-300 relative overflow-hidden rounded-md flex flex-row  shadow-[0_4px_0_rgba(0,0,0,0.25)]";
  const openClass =
    "h-fit p-4 pb-1 box-border flex-none w-full mb-5 bg-zinc-900/60 transition-all duration-300 relative overflow-hidden rounded-md flex flex-col  shadow-[0_4px_0_rgba(0,0,0,0.25)]";
  const {
    title = "Title",
    urlToImage = "",
    url = "",
    description = "kslfgougnjkgg",
    content = "sfkgllgj",
    publishedAt = "34.56.45",
  } = article;
  const navigate = useNavigate();

  return (
    <div
      className={isActive ? openClass : initialClass}
      onClick={() => {
        if (isActive) return;
        setIsActive((prev) => !prev);
      }}
    >
      <img
        className={`object-cover bg-zinc-800/60 transition-all duration-300 ${
          isActive ? "w-full h-40 mb-1" : "w-15 h-15"
        } rounded-md mr-7.5`}
        src={urlToImage}
        alt=""
      />
      <div
        className={`text-xs text-zinc-300 transition-all duration-500 ${
          isActive ? "self-start" : "self-center"
        } flex-1`}
      >
        <p
          className={`transition-all duration-500 ${
            isActive && " mb-3 text-base"
          } font-medium mb-1`}
        >
          {title.split("").length > 61 ? title.slice(0, 59) + "..." : title}
        </p>

        <p
          hidden={!isActive}
          className={`mb-3 ${
            isActive && "min-h-fit w-fit"
          } overflow-hidden  text-zinc-500 transition-all duration-900 h-0  w-0`}
        >
          {content ? content : description}
        </p>

        <p
          className="text-[10px] cursor-pointer font-light text-orange-500/90 transition-all duration-500"
          onClick={() => {
            if (!isActive) return;
            window.location.href = url;
          }}
        >
          {isActive ? "Read Article >" : publishedAt.split("T")[0]}
        </p>
        {/* <p className="text-orange-500 font-light">Ea Games</p> */}
      </div>
      <FontAwesomeIcon
        className="self-center mr-3 transition-all duration-500"
        icon={isActive ? faCaretUp : faCaretDown}
        onClick={(e) => {
          e.stopPropagation();
          setIsActive((prev) => !prev);
        }}
      />
    </div>
  );
};
