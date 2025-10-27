import { fetchGames } from "../services/api";
import { useFetch } from "../services/useFetch";

export const TestFetch = () => {
  const { loading, error, data } = useFetch(() =>
    fetchGames("https://game-review-production-ede3.up.railway.app/api/games/5")
  );
  return (
    <div>
      <p>Testing api</p>
      {loading ? "loading" : error ? "error" : data}
    </div>
  );
};
