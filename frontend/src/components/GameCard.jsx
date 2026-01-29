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
        isBrowse || isSearch ? "" : "w-[190px] h-[330px] "
      } game-card aspect-190/300 p-2 bg-zinc-800/80 rounded-md`}
      onClick={() => {
        navigate("/overview/" + name, {
          state: { gameID },
        });
      }}
    >
      <div className="rounded-md overflw-hidden h-83/100 max-h-83/100">
        <img
          loading="lazy"
          src={background_image || sekiro}
          className=" h-full w-full object-cover"
          alt=""
        />
      </div>
      <p className="text-3sm mt-3 text-white">
        {name?.length > 24 ? name.slice(0, 20) + "..." : name || "Sekiro"}
      </p>
      <p className="text-xs mt-1 px-1.5 mb-4 bg-zinc-800 text-zinc-500 w-fit rounded-full">
        {gen || "Adventure"}
      </p>
    </div>
  );
};
