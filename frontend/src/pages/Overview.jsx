import { ChevronDown, Star } from "lucide-react";
import { Calendar } from "lucide-react";
import { Building } from "lucide-react";
import { Earth } from "lucide-react";
import { Laptop } from "lucide-react";
import { GameCard } from "../components/GameCard";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import Loader from "../components/Loader";
import sadtear from "../assets/sadtear.svg";

export const Overview = () => {
  const rawgApiKey = import.meta.env.RAWG_API_KEY;
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { gameID } = location.state;
  const screenshotRef = useRef();
  const screenshotCardRef = useRef();
  const [error, setError] = useState(false);
  const [similar, setSimilar] = useState([]);
  const aboutRef = useRef(null);
  const descRef = useRef(null);

  if (descRef.current) descHeight = descRef.current.offsetHeight;
  console.log(gameData);

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
      const url = `https://api.rawg.io/api/games?key=${rawgApiKey}&genres=${genres.join()}`;
      console.log("fetching similar from", url);
      const res = await axios.get(url);
      setSimilar(res.data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching game data:", err);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games/${gameID}?key=${rawgApiKey}`
      );

      setGameData(res.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching game data:", err);
    } finally {
      try {
        const screenshots = await axios.get(
          `https://api.rawg.io/api/games/${gameID}/screenshots?key=${rawgApiKey}`
        );
        setGameData((prev) => {
          return {
            ...prev,
            screenshots: screenshots.data,
          };
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
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
    <div className="h-screen overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none] z-4 relative">
      <div className="lg:absolute lg:top-0 lg:w-full flex items-center justify-center  h-[45%] lg:h-fit">
        <img
          className="absolute inset-0 h-full w-full object-cover blur-[10px] lg:blur-[0px] brightness-50 mask lg:h-[330px]"
          src={gameData.background_image}
          alt=""
        />

        <div className="w-[114px] h-[164px] bg-zinc-800 z-1 lg:w-[220px] lg:h-[330px] rounded-md overflow-hidden lg:hidden ">
          <img
            className="w-full object-cover h-full shadow-[0_0px_14px_rgba(0,0,0)]"
            src={gameData.background_image}
            alt=""
          />
        </div>
      </div>

      <div className="px-3 mt-5 lg:px-30 md:px-10">
        <div className="  lg:flex lg:mt-30 gap-10 lg:items-center">
          <div className="hidden lg:block w-[114px] h-[164px] bg-zinc-800 relative lg:w-[220px] lg:h-[330px] rounded-md overflow-hidden ">
            <img
              className="w-full object-cover h-full shadow-[0_0px_14px_rgba(0,0,0)]"
              src={gameData.background_image}
              alt=""
            />
          </div>

          <div className="hidden lg:block">
            <p className=" text-3xl text-white mb-1">{gameData.name}</p>
            <p className="flex items-center text-xs text-zinc-500">
              <Star size={10} color="orange" />
              4.0 | Mojang | Adventure
            </p>
            {/*      --------------------Genres---------------------         */}
            <div className="mt-5 flex gap-3 w-full  overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
              {gameData.genres.map((genre, index) => {
                const { name } = genre;
                return (
                  <button className="text-xs px-5 rounded-full text-white py-1.5 bg-zinc-900 mt-4 border border-orange-500 tracking-widest ">
                    {" "}
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          <p className=" text-3xl text-white mb-1 lg:hidden">{gameData.name}</p>
          <p className="flex items-center text-xs text-zinc-500 lg:hidden">
            <Star size={10} color="orange" />
            4.0 | Mojang | Adventure
          </p>

          {/*      --------------------Genres---------------------         */}
          <div className="mt-5 flex gap-3 w-full  overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none] lg:hidden">
            {gameData.genres.map((genre, index) => {
              const { name } = genre;
              return (
                <button className="text-xs px-5 rounded-full text-white py-1.5 bg-zinc-900 mt-4 border border-orange-500 tracking-widest ">
                  {" "}
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/*---------------About------------------ */}

        <div className="hidden lg:block mt-10 relative transition-all duration-300 lg:h-fit lg:mt-20">
          <p className="text-xl text-white mb-1 ">About</p>

          <p className="text-lg text-zinc-500 " ref={aboutRef}>
            {gameData.description_raw || gameData.description}
          </p>

          {isAboutOpen ? (
            ""
          ) : (
            <div className="absolute w-full inset-0 h-full bg-gradient-to-b from-transparent to-zinc-950 lg:hidden"></div>
          )}

          <ChevronDown
            style={{ rotate: isAboutOpen ? "180deg" : "" }}
            className="absolute bottom-0 left-[50%] translate-x-[-50%] transition-all duration-300"
            onClick={() => {
              setIsAboutOpen((prev) => !prev);
            }}
            size={15}
            color="orange"
          />
        </div>
        <div
          className="mt-10 relative transition-all duration-300 lg:hidden"
          style={{
            overflow: "hidden",
            height: isAboutOpen
              ? `${aboutRef && aboutRef.current.offsetHeight + 40}px`
              : "72px",
          }}
        >
          <p className="text-sm text-zinc-500 " ref={aboutRef}>
            {gameData.description_raw || gameData.description}
          </p>

          {isAboutOpen ? (
            ""
          ) : (
            <div className="absolute w-full inset-0 h-full bg-gradient-to-b from-transparent to-zinc-950"></div>
          )}
        </div>

        {/*---------------Screenshots------------------ */}

        <div>
          <p className="text-xl text-white mb-5 mt-10 lg:mt-20 ">Screenshots</p>
          <div
            className=" overflow-x-auto  snap-x snap-mandatory flex gap-4 [scrollbar-width:none] [-webkit-scrollbar:display:none] lg:gap-6"
            ref={screenshotRef}
          >
            {gameData?.screenshots?.results.map((res) => {
              return (
                <div
                  ref={screenshotCardRef}
                  className="relative snap-start shrink-0 h-50 w-75 lg:w-[400px] lg:h-[300px] rounded-md overflow-hidden"
                >
                  <img
                    src={res.image}
                    alt=""
                    className="aspect-331/222  object-cover rounded-[30px] "
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/*--------------------Tags------------------------ */}

        <div className="mt-15 lg:mt-5">
          <p className="text-xl text-white mb-5  ">Tags</p>
          <div className="flex gap-3 w-full  overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
            {gameData.tags.map((item) => {
              return (
                <button className="min-w-fit text-xs px-5 rounded-full text-white py-1.5 bg-zinc-900 border border-amber-500 tracking-widest ">
                  {" "}
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/*      --------------------Ratings---------------------         */}
        <div className="mt-15 lg:mt-20">
          <p className="text-lg text-white mb-5  ">Rating</p>

          <div className="flex gap-5">
            <div className="flex flex-col">
              <p className="text-4xl text-zinc-300 text-right">
                {gameData.rating}
              </p>

              <div className="flex m-1">
                <Star size={10} color="orange" />
                <Star size={10} color="orange" />
                <Star size={10} color="orange" />
                <Star size={10} color="orange" />
                <Star size={10} color="orange" />
              </div>

              <p className="text-xs text-zinc-500 text-right">4567</p>
            </div>

            <div className="flex flex-col justify-between w-full">
              {gameData.ratings.map((rate) => {
                return (
                  <div className="flex items-center  gap-1 ">
                    <p className="text-xs text-zinc-500">{rate.id}</p>
                    <div className="w-full lg:w-[500px] bg-zinc-500 h-2 rounded-full">
                      <div
                        style={{ width: `${rate.percent}%` }}
                        className="bg-orange-500 rounded-full h-full"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*--------Additional Information------------------------- */}

        <div className="my-15 lg:my-25">
          <p className="text-xl lg:text-xl text-white mb-5 ">
            Additional Information
          </p>

          <div className="w-full h-50 bg-zinc-900 p-4 rounded-md grid grid-cols-3 ">
            <div>
              <p className="text-zinc-300 flex items-center gap-1 text-xs lg:text-sm">
                <Calendar size={10} color="orange" /> Release Date
              </p>
              <p className="text-zinc-500 text-xs">34/5/34</p>
            </div>
            <div>
              <p className="text-zinc-300 flex items-center gap-1 mb- text-xs lg:text-sm">
                <Building size={10} color="orange" /> Company
              </p>
              <p className="text-zinc-500 text-xs">34/5/34</p>
            </div>
            <div>
              <p className="text-zinc-300 flex items-center gap-1 text-xs lg:text-sm">
                <Earth size={10} color="orange" /> Website
              </p>
              <p className="text-zinc-500 text-xs">34/5/34</p>
            </div>
            <div>
              <p className="text-zinc-300 flex items-center gap-1 text-xs lg:text-sm">
                <Laptop size={10} color="orange" /> Platforms
              </p>
              <p className="text-zinc-500 text-xs">34/5/34</p>
            </div>
          </div>
        </div>

        {/*--------Similar Games------------------------- */}
        <div>
          <p className="text-xl text-white mb-5 ">Similar Games</p>

          <div className="flex gap-3 overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none] mb-15">
            {similar.map((gameData, index) => {
              return <GameCard gameData={gameData} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
