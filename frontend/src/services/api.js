import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGames = async (url) => {
  console.log("fetching games data ");
  const res = await fetch(url);
  const results = await res.json();
  if (!res.ok) {
    throw new Error("Unable to fetch news");
  }
  return results.results;
};

export const fetchNews = async (url) => {
  const res = await fetch(url);
  const results = await res.json();
  console.log("News results", results);

  if (!res.ok) {
    throw new Error("Unable to fetch news");
  }

  return results.articles;
};
