import { GameCard } from "../components/GameCard";
import { NewsCardII } from "../components/NewsCardII";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { NavLink, useNavigate } from "react-router";
import apex from "../assets/apexs.png";
import kratos from "../assets/kratos.png";
import sports from "../assets/sports.png";

import sekiro from "../assets/placeholder.jpg";
import { useFetch } from "../services/useFetch";
import Loader from "../components/Loader";
import sadtear from "../assets/sadtear.svg";

import grid from "../assets/grid.png";
import { fetchGames } from "../services/api";

export const Home = ({ games, loading, error, news, newsLoading }) => {
  const navigate = useNavigate();

  // const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const images = games?.slice(0, 6)?.map((item) => {
    return item.background_image;
  });

  useEffect(() => {
    
    setTimeout(handleChange, 5000);
  }, []);

  const handleChange = () => {
    setIndex((prev) => {
      if (prev >= images?.length - 1) return 0;
      else {
        return prev + 1;
      }
    });
    setTimeout(handleChange, 5000);
  };

  return error ? (
    <div className="absolute w-full h-full flex flex-col items-center justify-center z-4">
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
    <div className="h-screen   tracking-wider overflow-x-hidden  overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none] px-2 relative pb-30 z-4 ">
      <img
        className="absolute blur-[120px] top-25 right-[40%] rounded-md z-0 h-70/100 lg:h-full overflow-hidden opacity-50 lg:opacity-10"
        src={images[index]}
        alt=""
      />
      <div className="h-fit w-full  pt-30 pb-10 flex flex-col items-center gap-5 lg:pb-0 ">
        <p className="text-white/80 text-center text-5xl w-fit tracking-widest">
          Play, <br /> Review, <br />
          Repeat.
        </p>
        <p className="text-center text-base w-[168px] lg:w-[300px] text-zinc-400">
          Your one-stop hub for unbiased game reviews, player ratings, and
          trending releases.
        </p>
      </div>
      <Carousel data={games.slice(0, 6)} index={index} />
      {/*--------------Trending Gems------------------ */}

      <div className="relative mt-25 lg:px-30">
        <img
          className="absolute blur-[120px] top-25 left-[80%] rounded-md z-0 h-70/100 lg:h-full overflow-hidden opacity-50 lg:opacity-10"
          src={images[index]}
          alt=""
        />
        <p className="text-xl lg:text-xl text-white text-center mb-1">
          Trending Games
        </p>
        <p className="text-base lg:text-lg  text-zinc-400 text-center">
          What everyone’s playing right now
        </p>

        <div className="w-full z-1 rounded-xl h-fit  py-2.5 px-3 lg:bg-none mt-10">
          <div className="flex gap-3 overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
            {games?.map((item) => {
              return <GameCard gameData={item} />;
            })}
          </div>
        </div>
      </div>

      {/*-------------Popular Genres--------------*/}
      <div className="h-fit relative pb-3 w-full  mt-25 rounded-md  lg:flex lg:items-center lg:flex-col">
        <img
          className="absolute blur-[120px] top-25 right-[40%] rounded-md z-0 h-70/100 lg:h-full overflow-hidden opacity-50 lg:opacity-10"
          src={images[index]}
          alt=""
        />
        <p className="text-xl lg:text-xl text-white text-center mb-1">
          Popular Genres
        </p>
        <p className="text-base lg:text-lg text-zinc-400 text-center">
          Discover what genres are shaping the future
        </p>

        <div className="flex flex-row lg:flex-row lg:w-full h-70  gap-3 px-3 mt-10 overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none] lg:h-fit lg:flex-wrap lg:px-30 lg:justify-center lg:gap-5">
          {/* Item*/}
          <div className=" relative shrink-0 w-full lg:w-100 md:w-100    h-60 rounded-3xl overflow-hidden border border-orange-500">
            <img
              className="w-full h-full object-cover absolute inset-0 opacity-15 z-0"
              src={grid}
              alt=""
            />
            <div className="z-3 w-full h-full absolute inset-0">
              <div className="w-full h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>
              <div className="w-full rotate-90 h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>

              <div className="m-5 w-[60%]">
                <p className="text-lg mb-1.5 text-white/80 tracking-wide">
                  Adventure
                </p>
                <p className="text-xs text-zinc-400">
                  Embark on epic journeys filled with exploration, storytelling,
                  and discovery.
                </p>
              </div>
              <img
                src={apex}
                className="absolute w-[50%] right-0 object-cover rounded-xl bottom-0 h-40"
              ></img>
            </div>
          </div>

          {/* Item*/}
          <div className=" relative shrink-0 w-full lg:w-100 md:w-100   h-60 rounded-3xl overflow-hidden border border-orange-500">
            <img
              className="w-full h-full object-cover absolute inset-0 opacity-15 z-0"
              src={grid}
              alt=""
            />
            <div className="z-3 w-full h-full absolute inset-0">
              <div className="w-full h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>
              <div className="w-full rotate-90 h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>

              <div className="m-5 w-[60%]">
                <p className="text-lg mb-1.5 text-white/80 tracking-wide">
                  Action
                </p>
                <p className="text-xs text-zinc-400">
                  test your reflexes through combat, movement, and quick
                  decision-making.
                </p>
              </div>
              <img
                src={kratos}
                className="absolute w-[50%] right-0 object-cover rounded-xl bottom-0 h-40 "
              ></img>
            </div>
          </div>
          {/* Item*/}
          <div className=" relative shrink-0 w-full lg:w-100 md:w-100   h-60 rounded-3xl overflow-hidden border border-orange-500">
            <img
              className="w-full h-full object-cover absolute inset-0 opacity-15 z-0"
              src={grid}
              alt=""
            />
            <div className="z-3 w-full h-full absolute inset-0">
              <div className="w-full h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>
              <div className="w-full rotate-90 h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>

              <div className="m-5 w-[60%]">
                <p className="text-lg mb-1.5 text-white/80 tracking-wide">
                  Shooter
                </p>
                <p className="text-xs text-zinc-400">
                  From first-person firefights to tactical battles, shooter
                  games emphasize precision, strategy, and fast reactions.
                </p>
              </div>
              <img
                src={apex}
                className="absolute w-[50%] right-0 object-cover rounded-xl bottom-0 h-40 "
              ></img>
            </div>
          </div>
          {/* Item*/}
          <div className=" relative shrink-0 w-full lg:w-100 md:w-100   h-60 rounded-3xl overflow-hidden border border-orange-500">
            <img
              className="w-full h-full object-cover absolute inset-0 opacity-15 z-0"
              src={grid}
              alt=""
            />
            <div className="z-3 w-full h-full absolute inset-0">
              <div className="w-full h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>
              <div className="w-full rotate-90 h-4 bg-orange-500 rounded-[50%] absolute bottom-4 blur-[50px]"></div>

              <div className="m-5 w-[60%]">
                <p className="text-lg mb-1.5 text-white/80 tracking-wide">
                  Sports
                </p>
                <p className="text-xs text-zinc-400">
                  Step into the world of competition — football, basketball,
                  racing, or more.
                </p>
              </div>
              <img
                src={sports}
                className="absolute w-[50%] right-0 object-cover rounded-xl bottom-0 h-40 "
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-25">
        <img
          className="absolute blur-[120px] top-25 right-[40%] rounded-md z-0 h-70/100 lg:h-full overflow-hidden opacity-50"
          src={images[index]}
          alt=""
        />

        <p className="text-xl lg:text-xl text-white text-center mb-1">
          Game Quiz
        </p>
        <p className="text-base lg:text-lg text-zinc-400 text-center">
          How well do you know games ?
        </p>

        <div className="w-full h-fit flex justify-center items-center gap-3">
          <button className="h-5 w-5 bg-white rounded-full"></button>

          <div className="flex flex-col items-center w-[70%]  lg:w-[50%] md:w-[50%]">
            <img
              src={sekiro}
              className="mt-10 h-30 lg:h-80 md:h-50 w-full rounded-lg bg-sky-500 object-cover"
            ></img>

            <p className="text-white/80 text-base mt-3 mb-1">
              Sekiro's blade is made of metal ?
            </p>
            <div className="flex text-sm gap-5 text-zinc-400">
              <button>True</button>
              <p className="text-orange-500">Or</p>
              <button>False</button>
            </div>
          </div>

          <button className="h-5 w-5 bg-white rounded-full"></button>
        </div>
      </div>

      {/*-------------------NEWS---------------------*/}

      <div className="relative mt-25">
        <img
          className="absolute blur-[120px] top-25 right-[90%] rounded-md z-0 h-70/100 lg:h-full overflow-hidden opacity-30"
          src={images[index]}
          alt=""
        />
        <div className="flex flex-col items-center z-3">
          <p className="text-xl lg:text-xl text-white text-center mb-1">
            Latest News
          </p>
          <p className="text-base lg:text-lg text-zinc-400 text-center w-[70%] mb-10">
            From reveals to rumors — get the inside story first.
          </p>

          <div className="flex flex-col px-3 gap-15 mb-10 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 lg:px-30 ">
            {newsLoading
              ? "loading articles..."
              : news.slice(0, 3).map((article, index) => {
                  return <NewsCardII article={article} />;
                })}
          </div>

          <div className="flex justify-center h-fit items-center w-full ">
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
      </div>
      {/*---------------Random Games---------------------*/}
      <div className="relative mt-25 lg:px-30">
        <p className="text-xl lg:text-xl text-white text-center mb-1">
          Random Games
        </p>
        <p className="text-base lg:text-lg text-zinc-400 text-center">
          Feeling lucky today?
        </p>

        <div className="w-full rounded-xl h-fit  py-2.5 px-3 lg:bg-none mt-10 ">
          <div className="flex gap-3 overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]">
            {games?.map((item) => {
              return <GameCard gameData={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
