import axios from "axios";

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
  const res = await fetch(
    `https://game-review-production-ede3.up.railway.app/api/news`
  );
  const results = await res.json();

  if (!res.ok) {
    throw new Error("Unable to fetch news");
  }

  return results.articles;
};
