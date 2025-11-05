import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { GameCard } from "../components/GameCard";
import { GameCardLoad } from "../components/GameCardLoad";
import { NavLink } from "react-router";
import axios from "axios";
import sadtear from "../assets/sadtear.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Search = () => {
  const rawgApiKey = import.meta.env.VITE_RAWG_API_KEY;
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const { gameName, pagenum } = useParams();
  const dummy = [3, 3, 3, 3, 3, 3, 3, 3, 3];
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!pagenum) navigate(`/search/${gameName}/1`, { replace: true });
    fetchGames();
  }, [gameName, pagenum]);

  const handlePageChange = (dir) => {
    setLoading(true);
    if (dir == "next") {
      if (next)
        navigate(`/search/${gameName}/${Number(pagenum) + 1}`, {
          replace: true,
        });
      else {
        setLoading(false);
        alert("that's all 😌");
        return;
      }
    } else {
      if (previous)
        navigate(`/search/${gameName}/${Number(pagenum) - 1}`, {
          replace: true,
        });
      else {
        setLoading(false);
        alert("that's all 😌");
        return;
      }
    }
  };

  const fetchGames = async () => {
    const url = `https://api.rawg.io/api/games?key=${rawgApiKey}&search=${gameName}&page=${pagenum} `;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      const data = await response.data;
      setGames(data.results || []);
      setNext(data.next);
      setPrevious(data.previous);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth", // optional for smooth scroll
        });
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="pt-15 px-3 grid grid-cols-2 gap-3 overflow-auto h-screen [scrollbar-width:none] [-webkit-scrollbar:display:none] lg:grid-cols-4 lg:gap-9 lg:px-30 md:grid md:grid-cols-3 md:gap-5"
      ref={containerRef}
    >
      {error ? (
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
        dummy.map(() => {
          return <GameCardLoad />;
        })
      ) : (
        <>
          <p className="col-span-2 text-white/80 text-lg mb-5 text-center">
            Search result for : {gameName}
          </p>
          {games.map((game) => (
            <GameCard key={game.id} gameData={game} />
          ))}
        </>
      )}
      {/*----------------------------------PAGINATION-----------------------------*/}

      <div className="w-full px-3 h-fit flex justify-between justify-between col-span-full text-base text-white my-7 px-6 text-sm">
        <button
          className="rounded-full w-6 bg-zinc-800/60 flex items-center justify-center"
          onClick={() => {
            handlePageChange("previous");
          }}
        >
          <ChevronLeft size={15} color="white" />
        </button>

        <button className=" bg-orange-800/60 backdrop-blur-xl px-3 py-1 rounded-md">
          {pagenum}
        </button>
        <button
          className="rounded-full w-6 bg-zinc-800/60 flex items-center justify-center"
          onClick={() => {
            handlePageChange("next");
          }}
        >
          <ChevronRight size={15} color="white" />
        </button>
      </div>
    </div>
  );
};
