import { useEffect, useState } from "react";
import { NewsCard } from "../components/NewsCard";
import Loader from "../components/Loader";
import { NavLink } from "react-router";
import sadtear from "../assets/sadtear.svg";
import axios from "axios";
import { NewsCardII } from "../components/NewsCardII";

export const News = ({ news, loading, error }) => {
  return error ? (
    <div className="absolute w-full h-full flex flex-col items-center justify-center ">
      <img className="w-20" src={sadtear} alt="image" />

      <p className="text-sm font-medium mt-1 text-zinc-500 tracking-wider">
        {error}
      </p>

      <NavLink
        onClick={() => {
          setRefresh();
        }}
        className={"text-xs text-orange-500/80 cursor-pointer"}
      >
        Refresh{" "}
      </NavLink>
    </div>
  ) : loading ? (
    <Loader />
  ) : (
    <div className="px-3 ">
      <p className=" mb-5 mt-15 text-3xl text-center text-white ">
        Latest News
      </p>
      <div className="grid lg:grid-cols-3 lg:gap-9 lg:px-30 md:grid md:grid-cols-2 md:gap-5 gap-7 mb-7.5">
        {news.slice(0, 11).map((article, index) => {
          return <NewsCardII key={index} article={article} />;
        })}
      </div>
    </div>
  );
};
