import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faL } from "@fortawesome/free-solid-svg-icons";
import { GameCard } from "../components/GameCard";
import { NewsCardII } from "../components/NewsCardII";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { NavLink, useNavigate } from "react-router";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import apex from "../assets/apex.png";
import cod from "../assets/cod.png";
import mc from "../assets/mc.png";
import apexI from "../assets/apex.jpg";
import codI from "../assets/cod.jpg";
import mcI from "../assets/mc.jpg";
import axios from "axios";
import Loader from "../components/Loader";
import sadtear from "../assets/sadtear.svg";

export const Home = ({}) => {
  const navigate = useNavigate();
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState();
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
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/news`);
      setNews(res.data.articles);
    } catch (err) {
      console.error("Fetching news failed: ", err);
      setError(err.message);
    }
  };

  const fetchGames = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/games/1");
      const data = res.data;
      setGames(data.results);
      // setLoading(false);
    } catch (error) {
      console.log("Fetching games Failed ", error);
      setError(error.message);
    } finally {
    }
  };

  const hiddenGemScore = (game) => {
    const metacritic = game.metacritic || 75; // default if null
    const rating = game.rating || 4;
    const ratingsCount = game.ratings_count || 10;

    const score =
      (metacritic / 100) * 0.4 +
      (rating / 5) * 0.4 +
      (1 / (1 + ratingsCount / 1000)) * 0.2;

    return score;
  };

  return error ? (
    <div className="absolute w-full h-full flex flex-col items-center justify-center">
      <img className="w-20" src={sadtear} alt="image" />

      <p className="text-sm font-medium mt-1">{error}</p>

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
    <div className="w-full relative text-sm m-0 pb-3 ">
      <div className="flex relative h-50 gap-3 [scrollbar-width:none] [-webkit-scrollbar:display:none] w-full ">
        <Carousel slidesData={games} />
      </div>

      <div className="px-3 w-full flex mt-10 justify-between items-center">
        <p className=" font-bold  mb-4 text-base text-zinc-300 w-fit">
          Hidden Gems
        </p>
        <p className="font-bold  mb-1 text-xs font-medium text-zinc-500 w-fit">
          All
          <FontAwesomeIcon icon={faCaretRight} />
        </p>
      </div>

      <div className="px-3 flex flex-nowrap overflow-x-auto gap-3 scrollbar-hide w-full [scrollbar-width:none] [-webkit-scrollbar:display:none] ">
        {games.map((gameData, index) => {
          const { genres } = gameData;

          const similar = games.filter((game) => {
            let check = 0;
            genres.forEach((genre) => {
              if (game.genres.find((g) => g.id === genre.id)) check++;
            });
            if (check > 1) return game;
          });

          const score = hiddenGemScore(gameData);
          if (score > 0.75 && score < 0.85) {
            return (
              <GameCard key={index} gameData={gameData} similar={similar} />
            );
          }
        })}
      </div>

      <p className="font-bold mb-4 text-base ml-3 text-zinc-300 w-fit mt-10">
        Browse All Genres
      </p>

      <div className="relative h-60 w-full px-3">
        <div className="flex h-full gap-2 ">
          <div className="relative h-30 w-34 bg-zinc-700 overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover bg-zinc-800/60"
              src={codI}
              alt=""
            />
            <p className="absolute font-bold text-3xl left-1/2 text- -translate-x-1/2 top-5 after:content-[Battle Royale]">
              Shooter
            </p>

            <img
              className="absolute inset-0 w-full h-full object-cover "
              src={cod}
              alt=""
            />
          </div>
          <div className="relative h-full flex-1 bg-zinc-800 rounded-md overflow-hidden">
            <p className="absolute font-bold text-5xl left-1/2 text- -translate-x-1/2 top-5 after:content-[Battle Royale]">
              Battle Royale
            </p>
            <p
              className="absolute font-bold 
            text-transparent [-webkit-text-stroke:0.3px_white] text-5xl left-1/2 -translate-x-1/2 top-5  z-1"
            >
              Battle Royale
            </p>
            <img
              className="card absolute inset-0 w-full h-full object-cover drop-shadow-xs"
              src={apex}
              alt=""
            />
            <img
              className="w-full h-full object-cover bg-zinc-800/60"
              src={apexI}
              alt=""
            />
          </div>

          <div className="absolute bottom-0 h-27 box-content w-60/100 border-t-8 border-r-8 border-zinc-900   rounded-tr-md rounded-br-0">
            <img
              className="w-full h-full object-cover bg-zinc-800/60 rounded-md overflow-hidden"
              src={mcI}
              alt=""
            />
            <p className="absolute font-bold text-3xl left-1/2 -translate-x-1/2 top-5 text-white">
              Adventure
            </p>

            <img
              className="absolute inset-0 w-full h-full object-cover "
              src={mc}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="px-3 w-full mt-10 flex justify-between items-center">
        <p className=" font-bold mb-4 text-base text-zinc-300 w-fit ">
          Latest News
        </p>
        <p
          className="font-bold mb-1 text-xs font-medium text-zinc-500 w-fit cursor-pointer"
          onClick={() => {
            navigate("/news");
          }}
        >
          All
          <FontAwesomeIcon icon={faCaretRight} />
        </p>
      </div>

      <div className="px-3 flex flex-col gap-3">
        {news.slice(0, 4).map((article, index) => {
          return <NewsCardII article={article} />;
        })}
      </div>
    </div>
  );
};
