import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export const NewsCard = ({ article }) => {
  const openClass =
    "h-fit py-2 box-border w-full transition-all duration-300 relative overflow-hidden rounded-xs flex flex-col  shadow-[0_4px_4px_rgba(0,0,0,0.25)]";
  const {
    title = "Title",
    urlToImage,
    url,
    description,
    content,
    publishedAt,
  } = article;

  return (
    <div
      className={openClass}
      onClick={() => {
        if (isActive) return;
        setIsActive((prev) => !prev);
      }}
    >
      <img
        className={`object-cover transition-all duration-300 
          w-full h-40 mb-3
         rounded-xs mr-7.5`}
        src={urlToImage}
        alt=""
      />
      <div
        className={` transition-all duration-500 
           self-start px-2
         flex-1`}
      >
        <p
          className={`transition-all duration-500
          text-xl mb-3
           font-bold `}
        >
          {title.split("").length > 61 ? title.slice(0, 59) + "..." : title}
        </p>

        <p
          className={`mb-3 
            text-xs
            min-h-fit w-fit
            text-zinc-500
           overflow-hidden transition-all duration-900`}
        >
          {content ? content : description}
        </p>

        <p
          className="font-light text-orange-500 transition-all cursor-pointer duration-500 text-xs mb-3"
          onClick={() => {
            window.location.href = url;
          }}
        >
          {"Read Article >"}
        </p>
        {/* <p className="text-orange-500 font-light">Ea Games</p> */}
      </div>
    </div>
  );
};
