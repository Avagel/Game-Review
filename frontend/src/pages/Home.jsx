import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faL } from "@fortawesome/free-solid-svg-icons";
import { GameCard } from "../components/GameCard";
import { NewsCardII } from "../components/NewsCardII";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { NavLink, useNavigate } from "react-router";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import apex from "../assets/apex.jpg";
import apexpng from "../assets/apex.png";

import sekiro from "../assets/sekiro.jpg";
import sekiropng from "../assets/sekiropng.png";

import spiderman from "../assets/spiderman.jpg";
import spidermanpng from "../assets/spidermanpng.png";

import shooter from "../assets/shooter.jpg";
import shooterpng from "../assets/shooterpng.png";

import sports from "../assets/sports.jpg";
import sportspng from "../assets/sportspng.png";

import axios from "axios";
import Loader from "../components/Loader";
import sadtear from "../assets/sadtear.svg";

export const Home = ({ news, setNews }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState(null);
  const [hiddenGems, setHiddenGems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hiddenSelected, setHiddenSelected] = useState(true);
  const [trending, setTrending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (news && news.length > 0 && games && games.length > 0) setLoading(false);
  });

  useEffect(() => {
    if (news && news.length > 0) return;
    fetchNews();
  }, []);

  useEffect(() => {
    if (games && games.length > 0) return;
    fetchGames();
    fetchHiddenGems();
    fetchTrendingGames();
  }, []);

  const fetchNews = async () => {
    try {
      console.log("fetching news");
      const res = await axios.get(
        `https://game-review-production-ede3.up.railway.app/api/news`
      );
      setNews(res.data.articles);
      console.log("news fetched");
    } catch (err) {
      console.error("Fetching news failed: ", err);
      setError(err.message);
    }
  };

  const fetchTrendingGames = async () => {
    try {
      const res = await axios.get(
        "https://game-review-production-ede3.up.railway.app/api/games/30&ordering=rating"
      );
      const data = res.data;
      setTrending(data.results);
      console.log("fetched successfully");
    } catch (error) {
      console.log("Fetching games Failed ", error);
      setError(error.message);
    }
  };
  const fetchHiddenGems = async () => {
    try {
      const res = await axios.get(
        "https://game-review-production-ede3.up.railway.app/api/games/90"
      );
      const data = res.data;
      setHiddenGems(data.results);
      console.log("fetched successfully");
    } catch (error) {
      console.log("Fetching games Failed ", error);
      setError(error.message);
    }
  };
  const fetchGames = async () => {
    try {
      const res = await axios.get(
        "https://game-review-production-ede3.up.railway.app/api/games/5"
      );
      const data = res.data;
      setGames(data.results);
      console.log("fetched successfully");

      // setLoading(false);
    } catch (error) {
      console.log("Fetching games Failed ", error);
      setError(error.message);
    } finally {
    }
  };

  return error ? (
    <div className="absolute w-full h-full flex flex-col items-center justify-center">
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
    <div className="h-screen  overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
      <Carousel data={games.slice(0, 6)} />
      {/*--------------Hidden Gems------------------ */}

      <div className="lg:mt-15 lg:px-30">
        <p className="text-base lg:text-3xl text-white text-center mb-5">
          Discover Games <br /> From all Corners on Earth
        </p>

        <div className="w-full rounded-xl h-fit bg-gradient-to-b from-zinc-800/50  to-zinc-950  py-2.5 px-3 lg:bg-none">
          <nav className="mb-5">
            <button
              onClick={() => {
                setHiddenSelected(true);
              }}
              className={`text-xs px-5 rounded-full text-white py-2.5 mr-3 ${
                hiddenSelected ? "bg-zinc-950 lg:bg-zinc-800" : ""
              } `}
            >
              {" "}
              Hidden Gems
            </button>
            <button
              onClick={() => {
                setHiddenSelected(false);
              }}
              className={`text-xs px-5 rounded-full text-white py-2.5 ${
                !hiddenSelected ? "bg-zinc-950 lg:bg-zinc-800" : ""
              }`}
            >
              {" "}
              Trending
            </button>
          </nav>

          <div className="flex gap-3 overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none] mb-25">
            {hiddenSelected
              ? hiddenGems?.map((item) => {
                  return <GameCard gameData={item} />;
                })
              : trending?.map((item) => {
                  return <GameCard gameData={item} />;
                })}
          </div>
        </div>
      </div>

      {/*-------------Browse All Genres--------------*/}
      <div className="h-fit pb-3 w-full  bg-zinc-900 rounded-md relative mb-25 lg:flex lg:items-center lg:flex-col">
        <div className="absolute bg-zinc-950 rounded-full px-5 text-white text-base -translate-y-[50%] left-[50%] -translate-x-[50%] lg:text-3xl ">
          {" "}
          Browse All Genres
        </div>

        <div className="flex gap-3 px-3 overflow-auto justify-center [scrollbar-width:none] [-webkit-scrollbar:display:none]  lg:mt-5">
          <div
            className="relative w-fit hover:scale-110 transition-all duration-300"
            onClick={() => {
              navigate("/browse/1", { state: { _filter: [2, 4] } });
            }}
          >
            <div className="relative flex flex-col items-center w-30 h-40 ">
              <div className="h-30 absolute bottom-0 w-28 overflow-hidden rounded-t-md">
                <img
                  src={apex}
                  className="h-40 w-full object-cover absolute bottom-0"
                  alt=""
                />
              </div>
              <div className="h-40 w-30 inset-0 absolute">
                <img
                  src={apexpng}
                  className="h-40 w-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <p className="absolute text-white text-center text-base left-[50%] -translate-x-[50%] top-[70%] tracking-wider">
              Battle <br /> Royale
            </p>
            <div className="h-8 bg-sky-500 rounded-b-md bg-zinc-950"></div>
          </div>

          <div
            className="relative w-fit hover:scale-110 transition-all duration-300"
            onClick={() => {
              navigate("/browse/1", { state: { _filter: 2 } });
            }}
          >
            <div className="relative flex flex-col items-center w-30 h-40 ">
              <div className="h-30 absolute bottom-0 w-28 overflow-hidden rounded-t-md">
                <img
                  src={shooter}
                  className="h-40 w-full object-cover absolute bottom-0"
                  alt=""
                />
              </div>
              <div className="h-40 w-30 inset-0 absolute">
                <img
                  src={shooterpng}
                  className="h-40 w-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <p className="absolute text-white text-center text-base left-[50%] -translate-x-[50%] top-[85%] tracking-wider">
              Shooter
            </p>
            <div className="h-8 bg-sky-500 rounded-b-md bg-zinc-950"></div>
          </div>

          <div
            className="relative w-fit hover:scale-110 transition-all duration-300"
            onClick={() => {
              navigate("/browse/1", { state: { _filter: 3 } });
            }}
          >
            <div className="relative flex flex-col items-center w-30 h-40 ">
              <div className="h-30 absolute bottom-0 w-28 overflow-hidden rounded-t-md">
                <img
                  src={spiderman}
                  className="h-40 w-full object-cover absolute bottom-0"
                  alt=""
                />
              </div>
              <div className="h-40 w-30 inset-0 absolute">
                <img
                  src={spidermanpng}
                  className="h-40 w-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <p className="absolute text-white text-center text-base left-[50%] -translate-x-[50%] top-[85%] tracking-wider">
              Adventure
            </p>
            <div className="h-8 bg-sky-500 rounded-b-md bg-zinc-950"></div>
          </div>

          <div
            className="relative w-fit hover:scale-110 transition-all duration-300"
            onClick={() => {
              navigate("/browse/1", { state: { _filter: 4 } });
            }}
          >
            <div className="relative flex flex-col items-center w-30 h-40 ">
              <div className="h-30 absolute bottom-0 w-28 overflow-hidden rounded-t-md">
                <img
                  src={sekiro}
                  className="h-40 w-full object-cover absolute bottom-0"
                  alt=""
                />
              </div>
              <div className="h-40 w-30 inset-0 absolute">
                <img
                  src={sekiropng}
                  className="h-40 w-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <p className="absolute text-white text-center text-base left-[50%] -translate-x-[50%] top-[85%] tracking-wider">
              Action
            </p>
            <div className="h-8 bg-sky-500 rounded-b-md bg-zinc-950"></div>
          </div>

          <div
            className="relative w-fit hover:scale-110 transition-all duration-300"
            onClick={() => {
              navigate("/browse/1", { state: { _filter: 15 } });
            }}
          >
            <div className="relative flex flex-col items-center w-30 h-40 ">
              <div className="h-30 absolute bottom-0 w-30 overflow-hidden rounded-t-md">
                <img
                  src={sports}
                  className="h-40 w-full object-cover absolute bottom-0"
                  alt=""
                />
              </div>
              <div className="h-40 w-30 inset-0 absolute">
                <img
                  src={sportspng}
                  className="h-40 w-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <p className="absolute text-white text-center text-base left-[50%] -translate-x-[50%] top-[85%] tracking-wider">
              Sports
            </p>
            <div className="h-8 bg-sky-500 rounded-b-md bg-zinc-950"></div>
          </div>
        </div>
      </div>

      {/*-------------------NEWS---------------------*/}
      <div>
        <p className="text-base lg:text-3xl text-white text-center mb-5">
          See Latest News
        </p>
        <div className="flex flex-col px-3 gap-15 mb-10 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 lg:px-30 ">
          {news.slice(0, 4).map((article, index) => {
            return <NewsCardII article={article} />;
          })}
        </div>
        <div className="flex justify-center h-fit items-center w-full mb-15">
          <button
            className="text-xs px-5 rounded-full text-white py-2.5 border border-orange-500 mt-4 tracking-widest "
            onClick={() => {
              navigate("/news");
            }}
          >
            {" "}
            See More
          </button>
        </div>
      </div>
      <footer className="text-zinc-300 text-center mb-4">Made By Iruo</footer>
    </div>
  );
};
