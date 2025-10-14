import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameCard } from "../components/GameCard";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Loader from "../components/Loader";
import sadtear from "../assets/sadtear.svg";
import StarRating from "../components/StarRating";

export const Overview = () => {
  const [isSumOpen, setIsSumOpen] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { gameID } = location.state;
  const screenshotRef = useRef();
  const screenshotCardRef = useRef();
  const [error, setError] = useState(false);
  const [similar, setSimilar] = useState([]);
  const descRef = useRef(null);
  let descHeight;

  console.log(location.state);
  if (descRef.current) descHeight = descRef.current.offsetHeight;

  useEffect(() => {
    if (gameData && gameData.length > 0) return;
    if (gameID) {
      fetchData();
    }
  }, [gameID]);

  useEffect(() => {
    fetchSimilar();
  }, [gameData]);

  const fetchSimilar = async () => {
    if (!gameData) return;

    let genres;

    genres = gameData.genres.map((item) => {
      return item.id;
    });

    try {
      const url = `https://api.rawg.io/api/games?key=051442f84dc3402b885a0e52cecb4272&genres=${genres.join()}`;
      console.log("fetching similar from", url);
      const res = await axios.get(url);
      setSimilar(res.data.results);
      console.log("similar:", res.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching game data:", err);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games/${gameID}?key=051442f84dc3402b885a0e52cecb4272`
      );

      setGameData(res.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching game data:", err);
    } finally {
      try {
        const screenshots = await axios.get(
          `https://api.rawg.io/api/games/${gameID}/screenshots?key=051442f84dc3402b885a0e52cecb4272`
        );
        setGameData((prev) => {
          return {
            ...prev,
            screenshots: screenshots.data,
          };
        });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
  };

  return error ? (
    <div className="absolute w-full h-full flex flex-col items-center justify-center">
      <img className="w-20" src={sadtear} alt="image" />

      <p className="text-sm font-medium mt-1">{error.message}</p>

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
    <div className="relative  pb-7">
      <img
        className="absolute top-0 h-70 object-cover inset-0 blur-[26.7px] opacity-50"
        src={gameData.background_image}
      ></img>

      <div className="relative h-70  flex items-center">
        <div className="flex flex-col w-full items-center">
          <img
            className="w-30 h-30 rounded-md object-cover"
            src={gameData.background_image}
            alt=""
          />
          <p className="text-sm font-medium mt-1 ">{gameData.name}</p>
          <p className="text-xs text-orange-500 my-1">
            {gameData.developers[0].name}
          </p>
          <p className="text-xs">
            {gameData.rating}⭐ | {gameData.ratings_count} ratings |{" "}
            {gameData.genres[0].name}
          </p>
        </div>
      </div>

      <div
        style={{
          maxHeight: isSumOpen ? `${descHeight + 40}px` : "5rem", // 5rem ≈ Tailwind's max-h-20
          overflow: isSumOpen ? "visible" : "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
        className={`relative px-3 text-xs font-light text-zinc-400`}
      >
        <p className="text-white text-sm font-medium text-zinc-300 mb-3">
          About the Game
        </p>
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 rounded-md z-3  "
          hidden={isSumOpen}
        ></div>
        <p className="" ref={descRef}>
          {gameData.description_raw}
        </p>

        <FontAwesomeIcon
          className="absolute z-3 left-1/2 -translate-x-1/2 bottom-0"
          icon={isSumOpen ? faCaretUp : faCaretDown}
          onClick={() => {
            setIsSumOpen((prev) => !prev);
          }}
        />
      </div>

      {/*      --------------------ScreenShots---------------------         */}

      <div className=" relative h-fit  mx-3 mt-7  rounded-md pt-1 ">
        {/* <p className="text-xs ml-3 ">Screenshots</p> */}
        {/* <hr className=" text-zinc-400 mt-1" /> */}
        <div
          className=" overflow-x-auto  snap-x snap-mandatory flex gap-4 [scrollbar-width:none] [-webkit-scrollbar:display:none]"
          ref={screenshotRef}
        >
          {gameData?.screenshots?.results.map((res) => {
            return (
              <div
                ref={screenshotCardRef}
                className="relative snap-start shrink-0 h-50 w-75 rounded-md overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={res.image}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      {/*      --------------------Genres---------------------         */}

      <div className="px-3  mt-5 mb-10 flex gap-3">
        {gameData.genres.map((genre, index) => {
          const { name } = genre;
          return (
            <button className="text-[10px]  bg-zinc-900/60 border border-white/40 px-2 py-1 rounded-md ">
              {name}
            </button>
          );
        })}
      </div>

      {/*      --------------------Ratings---------------------         */}

      <p className="  mt-10 mb-4 ml-3 font-medium text-zinc-300 ">
        Ratings & Reviews
      </p>
      <p className="ml-3  mb-3 text-zinc-400 text-xs w-50">
        See how players rated this game.{" "}
      </p>
      <div className="flex px-3 gap-5">
        <div className="flex flex-col gap-0  justify-between">
          <p className="text-4xl font-medium">{gameData.rating}</p>
          <p className="text-xs my-1">
            <StarRating value={gameData.rating} />
          </p>
          <p className="text-xs text-zinc-700 font-medium">45670</p>
        </div>
        <div className="flex flex-1 flex-col gap-1 justify-center">
          {gameData.ratings.map((rate) => {
            return (
              <div className="flex items-center gap-2">
                <p className="text-[10px]">{rate.id}</p>
                <div className="w-9/10 bg-zinc-500 h-2 rounded-full">
                  <div
                    style={{ width: `${rate.percent}%` }}
                    className="bg-orange-500 rounded-full h-full"
                  ></div>
                </div>
              </div>
            );
          })}
          {/* <div className="flex items-center gap-2">
            <p className="text-[10px]">4</p>
            <div className="w-9/10 bg-zinc-500 h-2 rounded-full">
              <div className="w-9/10 bg-orange-500 rounded-full h-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[10px]">3</p>
            <div className="w-9/10 bg-zinc-500 h-2 rounded-full">
              <div className="w-9/10 bg-orange-500 rounded-full h-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[10px]">2</p>
            <div className="w-9/10 bg-zinc-500 h-2 rounded-full">
              <div className="w-9/10 bg-orange-500 rounded-full h-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] ">1</p>
            <div className="w-9/10 bg-zinc-500 h-2 rounded-full">
              <div className="w-9/10 bg-orange-500 rounded-full h-full"></div>
            </div>
          </div> */}
        </div>
      </div>

      <div className=" relative h-fit bg-zinc-800/60 mx-3 rounded-md pt-1 mt-10 overflow-hidden">
        <div className="p-3 h-fit gap-3 justify-between flex text-xs flex-wrap m-3  rounded-md">
          <div>
            <p className="mb-1 text-zinc-500">
              <FontAwesomeIcon icon={faBook} /> Published by
            </p>
            <p className="w-40 break-words text-orange-500">
              {gameData.developers[0].name}
            </p>
          </div>
          <div>
            <p className="mb-1 text-zinc-500">
              <FontAwesomeIcon icon={faCalendar} /> Release Date
            </p>
            <p className="w-70/100 break-words">{gameData.released}</p>
          </div>
          <div>
            <p className="w-70/100 break-words mb-1 text-zinc-500">
              <FontAwesomeIcon icon={faEarth} /> website
            </p>
            <p className="w-40 break-words">
              <NavLink to={gameData.website}>
                {gameData.website || "none"}
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      <p className=" mb-3 mt-10 ml-3 font-medium ">Similar Games</p>
      <div className="px-3 overflow-auto flex flex-nowrap gap-3 [scrollbar-width:none] [-webkit-scrollbar:display:none]">
        {similar.map((gameData, index) => {
          return <GameCard gameData={gameData} />;
        })}
      </div>
    </div>
  );
};
