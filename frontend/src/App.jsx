import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { Overview } from "./pages/Overview";
import { News } from "./pages/News";
import { Layout } from "./pages/Layout";
import { TestingAPI } from "./pages/TestingAPI";
import axios from "axios";
import { TestCarousel } from "./pages/TestCarousel";
import Loader from "./components/Loader";
import sadtear from "../src/assets/sadtear.svg";
import { Search } from "./pages/Search";
import { TestFetch } from "./pages/TestFetch";
import { useFetch } from "./services/useFetch";
import { fetchGames, fetchNews } from "./services/api";

function App() {
  const gNewsApiKey = import.meta.env.GNEWS_API_KEY;
  const rawgApiKey = import.meta.env.RAWG_API_KEY;
  const {
    data: games,
    loading: gamesLoading,
    error,
  } = useFetch(() =>
    fetchGames(
      `https://api.rawg.io/api/games?key=${rawgApiKey}&page=${5}&ordering = rating`,
    ),
  );

  const {
    data: news,
    loading: newsLoading,
    error: newsError,
  } = useFetch(() =>
    fetchNews(
      `https://gnews.io/api/v4/search?q=gaming&lang=en&max=5&apikey=${gNewsApiKey}`,
    ),
  );

  // const [news, setNews] = useState([]);
  const [BrowseFilter, setBrowseFilter] = useState();

  return (
    // <TestFetch/>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Home
                  news={news}
                  games={games}
                  error={error}
                  gamesLoading={gamesLoading}
                  newsLoading={newsLoading}
                />
              }
            />

            <Route path="browse" element={<Navigate to="1" replace />} />
            <Route
              path="browse/:pagenum"
              element={
                <Browse
                  games={games}
                  filter={BrowseFilter}
                  setFilter={setBrowseFilter}
                />
              }
            />

            <Route path="overview/:gameName" element={<Overview />} />
            <Route
              path="news"
              element={
                <News news={news} loading={newsLoading} error={newsError} />
              }
            />
            <Route path="search/:gameName/:pagenum" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
