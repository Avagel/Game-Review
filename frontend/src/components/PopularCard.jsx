import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export const PopularCard = ({ gameData }) => {
  console.log("gameData ", gameData);
  const { name, id, background_image, released, rating, genres } = gameData;
  const gameID = id;
  const navigate = useNavigate();

  return (
    <div
      className="h-full relative object-cover flex-none  w-full relative card overflow-hidden bg-zinc-800/60 cursor-pointer"
      onClick={() => {
        navigate("/overview/" + name, { state: gameID });
      }}
    >
      <img
        className="absolute inset-0 object-cover w-full  h-full bg-sky-500  z-0"
        src={background_image}
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70  z-3"></div>

      <div className="absolute bottom-3 left-3 bg-zinc z-4">
        <p className="font-bold text-sm my-1 h-fit">{name}</p>
        <p className="text-xs text-zinc-400 font-medium  ">
          {rating}⭐ | {new Date(released).getFullYear()} | {genres[0].name}
        </p>

        {/* <button
          className="text-xs rounded py-[0.6em] px-[1.2em] bg-zinc-950/70 "
          onClick={() => {
            navigate("/overview/" + name, { state: gameID });
          }}
        >
          See Details
        </button> */}
      </div>
    </div>
  );
};
