import { useLocation, useNavigate, useParams } from "react-router";
import { GameCard } from "../components/GameCard";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faCaretLeft,
  faGamepad,
  faPuzzlePiece,
  faSort,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Tag } from "lucide-react";
import { Building } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { Filter } from "lucide-react";

import { Gamepad } from "lucide-react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { GameCardLoad } from "../components/GameCardLoad";

import { BrowseFilter } from "../components/BrowseFilter";

export const Browse = ({ games: _games, filter, setFilter }) => {
  const rawgApiKey = import.meta.env.VITE_RAWG_API_KEY;
  const [games, setGames] = useState(_games);
  const { pagenum } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const containerRef = useRef(null);
  const dummy = [3, 3, 3, 3, 3, 3, 3];

  useEffect(() => {
    try {
      const { _filter } = location.state;
      setFilter({
        developers: [],
        tags: [],
        platforms: [],
        genres: _filter.length > 1 ? _filter : [_filter],
        order: [],
      });
    } catch (error) {
      console.log("error from _filter ", error);
    }
  }, []);

  useEffect(() => {
    if (!pagenum) navigate("/browse/1", { replace: true });
    if (filter) setIsFiltered(true);
    fetchGames();
  }, [pagenum, isFiltered, filter]);

  useEffect(() => {
    if (isFiltered) navigate("/browse/1", { replace: true });
  }, [filterMode]);

  const handlePageChange = (dir) => {
    setLoading(true);
    if (dir == "next") {
      if (next) navigate(`/browse/${Number(pagenum) + 1}`, { replace: true });
      else {
        setLoading(false);
        alert("that's all 😌");
        return;
      }
    } else {
      if (previous)
        navigate(`/browse/${Number(pagenum) - 1}`, { replace: true });
      else {
        setLoading(false);
        alert("that's all 😌");
        return;
      }
    }
  };

  const fetchGames = async () => {
    setLoading(true);
    const url = isFiltered
      ? getFilterLink(filter) + `&page=${pagenum}`
      : `https://api.rawg.io/api/games?key=${rawgApiKey}&page=${pagenum}&ordering = rating`;

    console.log("fetching", url);

    try {
      const res = await axios.get(url);
      const data = res.data;

      // The games are in the 'results' array of the response
      setNext(data.next);
      setPrevious(data.previous);
      setGames(data.results);
      console.log(data.results);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth", // optional for smooth scroll
        });
      }

      setLoading(false);
    } catch (e) {
      console.error("Fetching games failed: ", e);
    } finally {
    }
  };
  const handleFilterClick = (mode) => {
    setFilterMode(mode);
  };

  const getFilterLink = (filter) => {
    return `https://api.rawg.io/api/games?key=${rawgApiKey}${
      filter["developers"].length > 0
        ? "&developers=" + filter["developers"].join()
        : ""
    }${filter["tags"].length > 0 ? "&tags=" + filter["tags"].join(",") : ""}${
      filter["platforms"].length > 0
        ? "&platforms=" + filter["platforms"].join(",")
        : ""
    }${
      filter["genres"].length > 0 ? "&genres=" + filter["genres"].join(",") : ""
    }${
      filter["order"].length > 0 ? "&ordering=" + filter["order"].join(",") : ""
    }`;
  };

  const search = (filter) => {
    setIsFiltered(true);
  };

  return (
    <div
      className=" relative z-4 h-full overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]"
      ref={containerRef}
    >
      {filterMode ? (
        <BrowseFilter
          mode={filterMode}
          filter={filter}
          setFilter={setFilter}
          setFilterMode={setFilterMode}
          search={search}
        />
      ) : (
        ""
      )}
      <div
        className={`text-sm flex w-full transition-all duration-300 py-3 sticky top-0 items-center justify-center gap-3  bg-zinc-950/90 backdrop-blur-xl`}
      >
        <div
          className={`pt-15 flex text-zinc-300 w-full transition-all duration-300 py-3 sticky top-0 items-center justify-center gap-3  bg-zinc-950/90 backdrop-blur-xl`}
        >
          <button
            className="bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
            onClick={() => {
              handleFilterClick("developers");
            }}
          >
            <Building
              size={15}
              color={filter && filter["developers"].length ? "orange" : "white"}
            />
          </button>

          <button
            className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
            onClick={() => {
              handleFilterClick("tags");
            }}
          >
            <Tag
              size={15}
              color={filter && filter["tags"].length ? "orange" : "white"}
            />
          </button>

          <button
            className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
            onClick={() => {
              handleFilterClick("platforms");
            }}
          >
            <Gamepad
              size={15}
              color={filter && filter["platforms"].length ? "orange" : "white"}
            />
          </button>

          <button
            className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
            onClick={() => {
              handleFilterClick("genres");
            }}
          >
            <Filter
              size={15}
              color={filter && filter["genres"].length ? "orange" : "white"}
            />
          </button>

          <button
            className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
            onClick={() => {
              handleFilterClick("order");
            }}
          >
            <ListOrdered
              size={15}
              color={filter && filter["order"].length ? "orange" : "white"}
            />
          </button>
        </div>
      </div>

      <div className="mt-5 px-3  grid grid-cols-2 md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-9 lg:px-30 gap-3 ">
        {loading
          ? dummy.map(() => {
              return <GameCardLoad />;
            })
          : games.map((gameData) => {
              const { genres } = gameData;

              const similar = games.filter((game) => {
                let check = 0;
                genres.forEach((genre) => {
                  if (game.genres.find((g) => g.id === genre.id)) check++;
                });
                if (check > 1) return game;
              });
              return <GameCard gameData={gameData} similar={similar} />;
            })}
      </div>

      {/*----------------------------------PAGINATION-----------------------------*/}

      <div className="w-full px-3 h-fit flex justify-between text-base text-white my-7 px-6 lg:px-30 text-sm">
        <button className="rounded-full w-6 bg-zinc-800/60 ">
          <FontAwesomeIcon
            icon={faCaretLeft}
            onClick={() => {
              handlePageChange("previous");
            }}
          />
        </button>

        <button className=" bg-orange-800/60 backdrop-blur-xl px-3 py-1 rounded-md">
          {pagenum}
        </button>
        <button
          className="rounded-full w-6 bg-zinc-800/60 "
          onClick={() => {
            handlePageChange("next");
          }}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};
