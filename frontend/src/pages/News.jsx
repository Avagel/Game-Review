import { useEffect, useState } from "react";
import { NewsCard } from "../components/NewsCard";
import Loader from "../components/Loader";
import { NavLink } from "react-router";
import sadtear from "../assets/sadtear.svg";
import axios from "axios";
import { NewsCardII } from "../components/NewsCardII";

export const News = ({ news, setNews }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (news && news.length > 0) return;
    fetchNews();
  });

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        `https://game-review-production-ede3.up.railway.app/api/news`
      );
      setNews(res.data.articles);
      setLoading(false);
    } catch (err) {
      console.error("Fetching news failed: ", err);
      setError(err.message);
    }
  };

  return error ? (
    <div className="absolute w-full h-full flex flex-col items-center justify-center">
      <img className="w-20" src={sadtear} alt="image" />

      <p className="text-sm font-medium mt-1 text-zinc-500 tracking-wider">{error}</p>

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
      <div className="flex flex-col gap-7 mb-7.5">
        {news.slice(0, 11).map((article, index) => {
          return <NewsCardII key={index} article={article} />;
        })}
      </div>
    </div>
  );
};
