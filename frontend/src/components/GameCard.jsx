import { useLocation, useNavigate } from "react-router";
import sekiro from "../assets/apex.jpg";

export const GameCard = ({ gameData = [] }) => {
  const { background_image, name = "usa", id, genres } = gameData;
  const gameID = id;
  const navigate = useNavigate();
  const location = useLocation();
  const isBrowse = location.pathname.includes("browse");
  const isSearch = location.pathname.includes("search");
  const gen = genres && genres[0] ? genres[0].name : "";

  return (
    <div
      className={`${
        isBrowse || isSearch ? "" : "w-[190px] h-[300px]"
      } aspect-190/300 p-2 bg-zinc-900/80 rounded-md hover:scale-90 transition-all duration-300`}
      onClick={() => {
        navigate("/overview/" + name, {
          state: { gameID },
        });
      }}
    >
      <img
        loading="lazy"
        src={background_image || sekiro}
        className="rounded-md h-83/100 w-full object-cover"
        alt=""
      />
      <p className="text-3sm mt-1 text-white">
        {name?.length > 24 ? name.slice(0, 24) + "..." : name || "Sekiro"}
      </p>
      <p className="text-xs px-1 bg-zinc-800 text-zinc-500 w-fit rounded-full">
        {gen || "Adventure"}
      </p>
    </div>
  );
};
