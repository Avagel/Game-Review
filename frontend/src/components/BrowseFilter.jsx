import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterButton } from "./FilterButton";
import { useEffect, useRef, useState } from "react";
const orderingFields = [
  "name",
  "-name",
  "released",
  "-released",
  "added",
  "-added",
  "created",
  "-created",
  "updated",
  "-updated",
  "rating",
  "-rating",
  "metacritic",
  "-metacritic",
];
// Platforms - id, name, and slug
const platforms = [
  { id: 4, name: "PC", slug: "pc" },
  { id: 187, name: "PlayStation 5", slug: "playstation5" },
  { id: 1, name: "Xbox One", slug: "xbox-one" },
  { id: 18, name: "PlayStation 4", slug: "playstation4" },
  { id: 186, name: "Xbox Series S/X", slug: "xbox-series-x" },
  { id: 7, name: "Nintendo Switch", slug: "nintendo-switch" },
  { id: 3, name: "iOS", slug: "ios" },
  { id: 21, name: "Android", slug: "android" },
  { id: 8, name: "Nintendo 3DS", slug: "nintendo-3ds" },
  { id: 9, name: "Nintendo DS", slug: "nintendo-ds" },
  { id: 13, name: "Nintendo DSi", slug: "nintendo-dsi" },
  { id: 5, name: "macOS", slug: "macos" },
  { id: 6, name: "Linux", slug: "linux" },
  { id: 14, name: "Xbox 360", slug: "xbox360" },
  { id: 80, name: "Xbox", slug: "xbox-old" },
  { id: 16, name: "PlayStation 3", slug: "playstation3" },
  { id: 15, name: "PlayStation 2", slug: "playstation2" },
  { id: 27, name: "PlayStation", slug: "playstation1" },
  { id: 19, name: "PS Vita", slug: "ps-vita" },
  { id: 17, name: "PSP", slug: "psp" },
  { id: 10, name: "Wii U", slug: "wii-u" },
  { id: 11, name: "Wii", slug: "wii" },
  { id: 105, name: "GameCube", slug: "gamecube" },
  { id: 83, name: "Nintendo 64", slug: "nintendo-64" },
  { id: 24, name: "Game Boy Advance", slug: "game-boy-advance" },
  { id: 43, name: "Game Boy Color", slug: "game-boy-color" },
  { id: 26, name: "Game Boy", slug: "game-boy" },
  { id: 79, name: "SNES", slug: "snes" },
  { id: 49, name: "NES", slug: "nes" },
  { id: 55, name: "Classic Macintosh", slug: "macintosh" },
  { id: 41, name: "Apple II", slug: "apple-ii" },
  { id: 166, name: "Commodore / Amiga", slug: "commodore-amiga" },
  { id: 28, name: "Atari 7800", slug: "atari-7800" },
  { id: 31, name: "Atari 5200", slug: "atari-5200" },
  { id: 23, name: "Atari 2600", slug: "atari-2600" },
  { id: 22, name: "Atari Flashback", slug: "atari-flashback" },
  { id: 25, name: "Atari 8-bit", slug: "atari-8-bit" },
  { id: 34, name: "Atari ST", slug: "atari-st" },
  { id: 46, name: "Atari Lynx", slug: "atari-lynx" },
  { id: 50, name: "Atari XEGS", slug: "atari-xegs" },
  { id: 167, name: "Genesis", slug: "genesis" },
  { id: 107, name: "SEGA Saturn", slug: "sega-saturn" },
  { id: 119, name: "SEGA CD", slug: "sega-cd" },
  { id: 117, name: "SEGA 32X", slug: "sega-32x" },
  { id: 74, name: "SEGA Master System", slug: "sega-master-system" },
  { id: 106, name: "Dreamcast", slug: "dreamcast" },
  { id: 111, name: "3DO", slug: "3do" },
  { id: 112, name: "Jaguar", slug: "jaguar" },
  { id: 77, name: "Game Gear", slug: "game-gear" },
  { id: 12, name: "Neo Geo", slug: "neogeo" },
];

// Tags - id, name, and slug
const tags = [
  { id: 31, name: "Singleplayer", slug: "singleplayer" },
  { id: 40847, name: "Steam Achievements", slug: "steam-achievements" },
  { id: 7, name: "Multiplayer", slug: "multiplayer" },
  {
    id: 40836,
    name: "Full controller support",
    slug: "full-controller-support",
  },
  { id: 40849, name: "Steam Cloud", slug: "steam-cloud" },
  { id: 13, name: "Atmospheric", slug: "atmospheric" },
  { id: 7808, name: "steam-trading-cards", slug: "steam-trading-cards" },
  { id: 42, name: "Great Soundtrack", slug: "great-soundtrack" },
  { id: 24, name: "RPG", slug: "rpg" },
  { id: 18, name: "Co-op", slug: "co-op" },
  { id: 118, name: "Story Rich", slug: "story-rich" },
  { id: 36, name: "Open World", slug: "open-world" },
  { id: 411, name: "cooperative", slug: "cooperative" },
  { id: 8, name: "First-Person", slug: "first-person" },
  { id: 45, name: "2D", slug: "2d" },
  { id: 149, name: "Third Person", slug: "third-person" },
  { id: 32, name: "Sci-fi", slug: "sci-fi" },
  {
    id: 40845,
    name: "Partial Controller Support",
    slug: "partial-controller-support",
  },
  { id: 16, name: "Horror", slug: "horror" },
  { id: 30, name: "FPS", slug: "fps" },
];

// Genres - id, name, and slug
const genres = [
  { id: 4, name: "Action", slug: "action" },
  { id: 51, name: "Indie", slug: "indie" },
  { id: 3, name: "Adventure", slug: "adventure" },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
  { id: 10, name: "Strategy", slug: "strategy" },
  { id: 2, name: "Shooter", slug: "shooter" },
  { id: 40, name: "Casual", slug: "casual" },
  { id: 14, name: "Simulation", slug: "simulation" },
  { id: 7, name: "Puzzle", slug: "puzzle" },
  { id: 11, name: "Arcade", slug: "arcade" },
  { id: 83, name: "Platformer", slug: "platformer" },
  { id: 59, name: "Massively Multiplayer", slug: "massively-multiplayer" },
  { id: 1, name: "Racing", slug: "racing" },
  { id: 15, name: "Sports", slug: "sports" },
  { id: 6, name: "Fighting", slug: "fighting" },
  { id: 19, name: "Family", slug: "family" },
  { id: 28, name: "Board Games", slug: "board-games" },
  { id: 17, name: "Card", slug: "card" },
  { id: 34, name: "Educational", slug: "educational" },
];

// Developers - id, name, and slug
const developers = [
  { id: 1612, name: "Valve Software", slug: "valve-software" },
  { id: 405, name: "Ubisoft", slug: "ubisoft" },
  { id: 18893, name: "Feral Interactive", slug: "feral-interactive" },
  { id: 3709, name: "Ubisoft Montreal", slug: "ubisoft-montreal" },
  { id: 4132, name: "Square Enix", slug: "square-enix" },
  { id: 3678, name: "Capcom", slug: "capcom" },
  { id: 109, name: "Electronic Arts", slug: "electronic-arts" },
  { id: 17132, name: "Aspyr Media", slug: "aspyr-media" },
  {
    id: 6,
    name: "Sony Interactive Entertainment",
    slug: "sony-interactive-entertainment",
  },
  { id: 425, name: "SEGA", slug: "sega" },
];

export const BrowseFilter = ({
  mode,
  setFilterMode,
  filter,
  setFilter,
  search,
}) => {
  const [data, setData] = useState([]);
  const [height, setHeight] = useState("h-0 overflow-hidden");
  const [platformMap, setPlatformMap] = useState(new Map());
  const [genreMap, setGenreMap] = useState(new Map());
  const [developerMap, setDeveloperMap] = useState(new Map());
  const [tagMap, setTagMap] = useState(new Map());
  const [orderMap, setOrderMap] = useState(new Map());
  const [currentMap, setCurrentMap] = useState();
  const setMap = useRef();

  useEffect(() => {
    updateMaps();
    setHeight("h-77/100 pt-3");
    getData();
    setMap.current = getSetMap();
    setCurrentMap(getMap());
    // console.log(genreMap,orderMap,tagMap,developerMap)
  }, [mode]);

  const updateMaps = () => {
    //platform
    //id,name
    if (filter[0] && filter[0].length > 0) {
      filter[0].forEach((id) => {
        const item = developers.find((d) => d.id == id);
        setDeveloperMap((prev) => {
          return new Map(prev).set(id, item.name);
        });
      });
    }
    if (filter[1] && filter[1].length > 0) {
      filter[1].forEach((id) => {
        const item = tags.find((d) => d.id == id);
        setTagMap((prev) => {
          return new Map(prev).set(id, item.name);
        });
      });
    }
    if (filter[2] && filter[2].length > 0) {
      filter[2].forEach((id) => {
        const item = platforms.find((d) => d.id == id);
        setPlatformMap((prev) => {
          return new Map(prev).set(id, item.name);
        });
      });
    }
    if (filter[3] && filter[3].length > 0) {
      filter[3].forEach((id) => {
        const item = genres.find((d) => d.id == id);
        setGenreMap((prev) => {
          return new Map(prev).set(id, item.name);
        });
      });
    }
    if (filter[4] && filter[4].length > 0) {
      filter[4].forEach((id) => {
        const item = order.find((d) => d.id == id);
        setOrderMap((prev) => {
          return new Map(prev).set(id, item.name);
        });
      });
    }
  };

  const getData = () => {
    switch (mode) {
      case "platforms":
        setData(platforms);
        break;
      case "tags":
        setData(tags);
        break;
      case "developers":
        setData(developers);
        break;
      case "genres":
        setData(genres);
        break;
      case "order":
        setData(orderingFields);
    }
  };
  const getSetMap = () => {
    switch (mode) {
      case "platforms":
        return setPlatformMap;
      case "tags":
        return setTagMap;
      case "developers":
        return setDeveloperMap;
      case "genres":
        return setGenreMap;
      case "order":
        return setOrderMap;
    }
  };
  const getMap = () => {
    console.log(mode);
    switch (mode) {
      case "platforms":
        return platformMap;
      case "tags":
        return tagMap;
      case "developers":
        return developerMap;
      case "genres":
        return genreMap;
      case "order":
        return orderMap;
    }
  };

  const handleFilter = () => {
    const seletedPlatform = Array.from(platformMap.keys());
    const selectedTags = Array.from(tagMap.keys());
    const selectedGenre = Array.from(genreMap.keys());
    const selectedDevelopers = Array.from(developerMap.keys());
    const selectedOrder = Array.from(orderMap.keys());
    setFilterMode(null);

    setFilter([
      selectedDevelopers,
      selectedTags,
      seletedPlatform,
      selectedGenre,
      selectedOrder,
    ]);

    search([
      selectedDevelopers,
      selectedTags,
      seletedPlatform,
      selectedGenre,
      selectedOrder,
    ]);
  };

  return (
    <div
      className={`fixed bottom-0 transition-all duration-300 ${height}  z-3 bg-zinc-900/90 backdrop-blur-xl w-full `}
    >
      <div className="overflow-auto h-85/100 [scrollbar-width:none] [-webkit-scrollbar:display:none] px-3">
        <div
          className={`text-sm px-3 w-full py-3 h-fit flex items-center justify-between`}
        >
          <div>
            <p className="text-sm mb-1">{mode}</p>
            <p className="text-xs text-zinc-300 font-light">
              see where you can play the games
            </p>
          </div>
          <button
            className="text-orange-300"
            onClick={() => {
              setHeight("h-0 overflow-hidden none");
              setFilterMode(null);
            }}
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </div>

        {data.map((tag) => {
          if (mode !== "order") {
            const { id, name, slug } = tag;
            const check = currentMap.has(id);

            return (
              <FilterButton
                key={slug}
                name={name}
                id={id}
                setMap={setMap.current}
                _active={check}
              />
            );
          } else {
            return "";
          }
        })}
      </div>
      <div className="flex justify-between items-center bg-zinc-900 h-15/100 px-3 border-t-[1px]">
        <button className="text-xs h-fit py-2 border border-orange-500 px-4 rounded-md">
          {" "}
          Reset
        </button>
        <button
          className="text-xs h-fit py-2 bg-orange-500 px-4 rounded-md"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
