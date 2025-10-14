import { useLocation, useNavigate } from "react-router";

export const GameCardLoad = () => {
  return (
    <div
      className={`flex-none loading box-border w-35 p-3 rounded-md h-fit aspect-120/168 font-medium text-xs overflow-hidden bg-zinc-800/60 flex flex-col`}
      onClick={() => {
        navigate("/overview/" + name, {
          state: { gameID, similar },
        });
      }}
    >
      <div
        loading="lazy"
        className="h-67/100 w-full rounded-md object-cover mb-2 loading"
        src={""}
        alt=""
      />
      <p className="flex items-center loading h-fit"></p>

      <div className="w-5 h-2 rounded-full px-1 loading text-zinc-400 mt-1 "></div>
    </div>
  );
};
