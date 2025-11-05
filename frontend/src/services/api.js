import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGames = async (url) => {
  console.log("fetching games data ");
  const res = await fetch(url, { method: "GET" });
  const result = await res.json();
  if (!res.ok) {
    throw new Error("unable to fetch games");
  }

  return result.results;
};

export const fetchNews = async () => {
  const res = await fetch(`${apiUrl}/api/news`);
  const results = await res.json();

  if (!res.ok) {
    throw new Error("Unable to fetch news");
  }

  return results.articles;
};
