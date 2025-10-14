import { useLocation, useNavigate } from "react-router";

export const GameCard = ({ gameData = [], similar }) => {
  const { background_image, name = "usa", id, rating } = gameData;
  const gameID = id;
  const navigate = useNavigate();
  const location = useLocation();
  const isBrowse = location.pathname.includes("browse");
  const isOverview = location.pathname.includes("overview");

  const classBrowse = `box-border rounded-md aspect-120/150 font-medium text-sm overflow-hidden px-3 flex flex-col justify-center `;

  const classOver = `flex-none box-border w-30 rounded-md h-fit aspect-120/168 font-medium text-xs overflow-hidden  flex flex-col`;

  const classBase = `flex-none box-border w-35 p-3 rounded-md h-fit aspect-120/168 font-medium text-xs overflow-hidden bg-zinc-800/60 flex flex-col`;

  return (
    <div
      className={isBrowse ? classBrowse : isOverview ? classOver : classBase}
      onClick={() => {
        navigate("/overview/" + name, {
          state: { gameID, similar },
        });
      }}
    >
      <img
        loading="lazy"
        className="h-67/100 w-full rounded-md object-cover mb-2 bg-zinc-800"
        src={`https://media.rawg.io/media/crop/600/400/${
          background_image?.split("media/")[1]
        }`}
        alt=""
      />
      <p className="flex items-center h-fit">
        {name.split("").length > 17 ? name.slice(0, 15) + "..." : name}
      </p>

      <div className="w-fit rounded-full px-1 text-[10px] bg-zinc-800 text-zinc-400 mt-1 ">
        <p className="m-0">{rating}⭐</p>
      </div>
    </div>
  );
};
