import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router";

const CarouselItem = ({ data }) => {
  const { background_image: img, name, released, genres, rating } = data;
  return (
    <div className=" relative h-full bg-gray-400 dark:bg-gray-700 dark:text-white">
      <div className="w-full h-full bg-zinc-950/30 absolute inset-0"></div>
      <img src={img} className=" h-full object-cover w-full" alt="" />
      <div className="absolute top-[50%] left-[50%] -translate-[50%]">
        <p className=" [text-shadow:0_0_0.15em_#000] text-center opacity-80  font-bold text-8xl  ">
          {name}
        </p>
        <p className="tracking-widest text-center space-x-3 [text-shadow:0_0_0.15em_#000]  text-lg font-semibold opacity-90">
          {`${released.split("-")[0]} | ${genres[0].name} | ${rating} ⭐`}
        </p>
      </div>
    </div>
  );
};

export default CarouselItem;
