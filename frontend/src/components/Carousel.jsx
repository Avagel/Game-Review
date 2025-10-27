import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import mc from "../assets/mc.jpg";
import apex from "../assets/apex.jpg";
import { useEffect } from "react";
import { Star } from "lucide-react";

export default function Carousel({ data, index }) {
  console.log(data);
  const images = data?.map((item) => {
    return item.background_image;
  });
  const names = data?.map((item) => {
    return item.name;
  });

  return (
    <>
      <div className=" rounded-md relative h-fit lg:h-full overflow-hidden ">
        <div
          className=" w-full object-cover h-100 mask"
          style={{
            backgroundImage: `url(${images[index] || mc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: ".5s all linear",
          }}
        ></div>

        <div className="flex flex-col items-start inset-0 top-[75%] ml-6  ">
          <p className="text-4xl text-white p-0 tracking-widest h-fit mb-1 w-full ">
            {names ? names[index] : "Minecraft"}
          </p>

          <div className="flex items-center gap-1 mb-5 text-zinc-400">
            <p className="text-sm ">Action | Adventure |</p>
            <span className="flex items-baseline gap-1">
              <p className="text-sm">4.0</p>
              <Star size={10} className="text-orange-500" />
            </span>
          </div>
          <p className="text-xs text-orange-500">See Details</p>
        </div>
      </div>
    </>
  );
}
