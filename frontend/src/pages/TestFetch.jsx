import { fetchGames } from "../services/api";
import { useFetch } from "../services/useFetch";

export const TestFetch = () => {
  const apiUrl = import.meta.env.API_URL;
  const { loading, error, data } = useFetch(() =>
    fetchGames(`${apiUrl}/api/games/5`)
  );
  return (
    <div>
      <p>Testing api</p>
      {loading ? "loading" : error ? "error" : data}
    </div>
  );
};
