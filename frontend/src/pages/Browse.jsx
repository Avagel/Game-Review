import { useNavigate, useParams } from "react-router";
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
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { GameCardLoad } from "../components/GameCardLoad";
import filterSvg from "../assets/filterSvg.svg";
import { BrowseFilter } from "../components/BrowseFilter";

export const Browse = ({ games, setGames, filter, setFilter }) => {
  const { pagenum } = useParams();
  const navigate = useNavigate();

  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const containerRef = useRef(null);
  const dummy = [3, 3, 3, 3, 3, 3, 3];
  useEffect(() => {
    if (filter) setIsFiltered(true);
  }, []);

  useEffect(() => {
    if (!pagenum) navigate("/browse/1", { replace: true });
    fetchGames();
  }, [pagenum, isFiltered, filter]);
  useEffect(() => {
    navigate("/browse/1", { replace: true });
  }, [filter]);

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
      : `https://api.rawg.io/api/games?key=051442f84dc3402b885a0e52cecb4272&page=${pagenum}`;

    console.log("fetching", url);

    try {
      const res = await axios.get(url);
      const data = res.data;

      // The games are in the 'results' array of the response
      setNext(data.next);
      setPrevious(data.previous);
      setGames(data.results);
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
    return `https://api.rawg.io/api/games?key=051442f84dc3402b885a0e52cecb4272${
      filter[0].length > 0 ? "&developers=" + filter[0].join() : ""
    }${filter[1].length > 0 ? "&tags=" + filter[1].join(",") : ""}${
      filter[2].length > 0 ? "&platforms=" + filter[2].join(",") : ""
    }${filter[3].length > 0 ? "&genres=" + filter[3].join(",") : ""}${
      filter[4].length > 0 ? "&ordering=" + filter[4].join(",") : ""
    }`;
  };
  const search = (filter) => {
    setIsFiltered(true);
  };

  return (
    <div
      className=" relative h-90/100 overflow-auto [scrollbar-width:none] [-webkit-scrollbar:display:none]"
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
        <button
          className={" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"}
          onClick={() => {
            handleFilterClick("developers");
          }}
        >
          <FontAwesomeIcon
            className={
              filter && filter[0].length > 0 ? `text-orange-500` : ""
            }
            icon={faPuzzlePiece}
          />{" "}
        </button>
        <button
          className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
          onClick={() => {
            handleFilterClick("tags");
          }}
        >
          <FontAwesomeIcon
            className={
              filter && filter[1].length > 0 ? `text-orange-500` : ""
            }
            icon={faTag}
          />
        </button>
        <button
          className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
          onClick={() => {
            handleFilterClick("platforms");
          }}
        >
          <FontAwesomeIcon
            className={
              filter && filter[2].length > 0 ? `text-orange-500` : ""
            }
            icon={faGamepad}
          />
        </button>
        <button
          className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
          onClick={() => {
            handleFilterClick("genres");
          }}
        >
          <svg
            className="w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <title>fliter_2_fill</title>
            <g
              id="页面-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="System"
                transform="translate(-528.000000, -240.000000)"
                fill-rule="nonzero"
              >
                <g
                  id="fliter_2_fill"
                  transform="translate(528.000000, 240.000000)"
                >
                  <path
                    d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                    id="MingCute"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M14,16.5 C14.8284,16.5 15.5,17.1716 15.5,18 C15.5,18.7796706 14.9050879,19.4204457 14.1444558,19.4931332 L14,19.5 L10,19.5 C9.17157,19.5 8.5,18.8284 8.5,18 C8.5,17.2203294 9.09488554,16.5795543 9.85553954,16.5068668 L10,16.5 L14,16.5 Z M17,10.5 C17.8284,10.5 18.5,11.1716 18.5,12 C18.5,12.8284 17.8284,13.5 17,13.5 L7,13.5 C6.17157,13.5 5.5,12.8284 5.5,12 C5.5,11.1716 6.17157,10.5 7,10.5 L17,10.5 Z M20,4.5 C20.8284,4.5 21.5,5.17157 21.5,6 C21.5,6.82843 20.8284,7.5 20,7.5 L4,7.5 C3.17157,7.5 2.5,6.82843 2.5,6 C2.5,5.17157 3.17157,4.5 4,4.5 L20,4.5 Z"
                    id="形状"
                    fill={`${
                      filter && filter[3].length > 0
                        ? `#ff6900`
                        : "#ffffffff"
                    }`}
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button
          className=" bg-zinc-800/60 backdrop-blur-xl p-4 rounded-md"
          onClick={() => {
            handleFilterClick("order");
          }}
        >
          <FontAwesomeIcon icon={faArrowDownShortWide} />
        </button>
      </div>

      <div className="mt-5 px-3 grid grid-cols-2 gap-3">
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

      <div className="w-full px-3 h-fit flex justify-between text-base text-white my-7 px-6 text-sm">
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
