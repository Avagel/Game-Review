import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GameCard } from "../components/GameCard";
import { GameCardLoad } from "../components/GameCardLoad";
import { NavLink } from "react-router";
import axios from "axios";
import sadtear from "../assets/sadtear.svg"

export const Search = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { gameName } = useParams();
  const dummy = [3, 3, 3, 3, 3, 3, 3, 3, 3];

  useEffect(() => {
    fetchGames();
  }, [gameName]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=051442f84dc3402b885a0e52cecb4272&search=${gameName}`
      );
      const data = await response.data;
      setGames(data.results || []);
    } catch (err) {
      setError("Failed to fetch games 😢");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 px-3 grid grid-cols-2 gap-3 ">
      {error ? (
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
        dummy.map(() => {
          return <GameCardLoad />;
        })
      ) : (
        games.map((game) => <GameCard key={game.id} gameData={game} />)
      )}
    </div>
  );
};
